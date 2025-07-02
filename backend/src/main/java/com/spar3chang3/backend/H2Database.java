package com.spar3chang3.backend;

import java.sql.*;
import java.util.List;

public class H2Database {
    private static final String JDBC_URL = "jdbc:h2:./resources/stats;DB_CLOSE_ON_EXIT=FALSE"; // TODO: change this from literally being inside the java database to its own separate folder;
    private static final String JDBC_USER = "stat";
    private static final String JDBC_PASS = "";

    private static final String TABLE_INIT = "CREATE TABLE IF NOT EXISTS stats(" +
            "id VARCHAR(255) PRIMARY KEY," +
            "visitTime BIGINT NOT NULL," +
            "leaveTime BIGINT," + // Could be null if user leaves and my event listener does not run
            "timezone VARCHAR(255) NOT NULL," +
            "userAgent VARCHAR(1024) NOT NULL," +
            "platform VARCHAR(255) NOT NULL," +
            "screen VARCHAR(255) NOT NULL," +
            "pagesVisited VARCHAR ARRAY NOT NULL" +
            ")";

    private static final String STAT_INIT = "INSERT INTO stats (id, visitTime, leaveTime, timezone, userAgent, platform, screen, pagesVisited) VALUES (?, ?, NULL, ?, ?, ?, ?, ARRAY[])";

    private static final String STAT_PAGES_UPDATE = "UPDATE stats SET pagesVisited = ? WHERE id = ?";

    private static final String STAT_LEAVE_TIME_UPDATE = "UPDATE stats SET leaveTime = ? WHERE id = ?";

    private static final String STAT_TOTAL_UPDATE = "UPDATE stats SET leaveTime = ?, pagesVisited = ? WHERE id = ?";

    private static final String STAT_SELECT_PAGES = "Select pagesVisited WHERE id = ?";

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);
    }

    protected static void initDatabase() {
        try (Connection statConn = getConnection(); Statement statement = statConn.createStatement()) {
            statement.execute(TABLE_INIT);
        } catch (SQLException e) {
            System.err.println("Database init error: " + e.getMessage());
            e.printStackTrace();
            System.exit(-1);
        }
    }

    protected static Status<String> addStat(Stat stat) {
        try (Connection statConn = getConnection(); PreparedStatement preState = statConn.prepareStatement(STAT_INIT)) {
            preState.setString(1, stat.id);
            preState.setLong(2, stat.visitTime);
            preState.setNull(3, java.sql.Types.BIGINT);
            preState.setString(4, stat.timezone);
            preState.setString(5, stat.userAgent);
            preState.setString(6, stat.platform);
            preState.setString(7, stat.screen);
            preState.setObject(8, stat.pagesVisited.toArray());

            preState.executeUpdate();
            return new Status<>(StatusCode.CREATED, stat.id);
        } catch (SQLException e) {
            System.err.println("Error adding user: " + e.getMessage());
            e.printStackTrace();
            return new Status<>(StatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    protected static Status<Void> updateStat(StatUpdate update) {
        update.id = Utils.SanitizeId(update.id);
        if (update.id == null) {
            return new Status<>(StatusCode.EXPECTATION_FAILED);
        }
        try (Connection statConn = getConnection(); PreparedStatement preState = statConn.prepareStatement(STAT_TOTAL_UPDATE);) {
            if (update.leaveTime != null || update.leaveTime != -1) {
                preState.setLong(1, update.leaveTime);
            } else {
                preState.setNull(1, -1);
            }
            if (update.pagesVisited != null) {
                preState.setObject(2, update.pagesVisited.toArray());
            } else {
                preState.setObject(2, List.of("Somehow this got nulled lmao").toString());
            }
            preState.setString(3, update.id);
            preState.executeUpdate();
            return new Status<>(StatusCode.OK);
        } catch (SQLException e) {
            System.err.println("Error updating stats: " + e.getMessage());
            e.printStackTrace();
            return new Status<>(StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}
