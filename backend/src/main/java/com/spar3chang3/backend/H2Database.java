package com.spar3chang3.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class H2Database {
    private static final String JDBC_URL = "jdbc:h2:./data/stats;DB_CLOSE_ON_EXIT=FALSE"; // TODO: change this from literally being inside the java database to its own separate folder;
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

    private static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);
    }

    protected static void initDatabase() {
        try (Connection conn = getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(TABLE_INIT);
        } catch (SQLException e) {
            System.err.println("Database init error: " + e.getMessage());
            e.printStackTrace();
            System.exit(-1);
        }
    }

    protected static String addStat(Stat stat) {
        try (Connection conn = getConnection(); PreparedStatement preState = conn.prepareStatement(STAT_INIT)) {
            preState.setString(1, stat.id);
            preState.setLong(2, stat.visitTime);
            preState.setNull(3, java.sql.Types.BIGINT);
            preState.setString(4, stat.timezone);
            preState.setString(5, stat.userAgent);
            preState.setString(6, stat.platform);
            preState.setString(7, stat.screen);
            preState.setObject(8, stat.pagesVisited.toArray());

            preState.executeUpdate();
            return stat.id; // Return this for the ultimate response from backend to frontend
        } catch (SQLException e) {
            System.err.println("Error adding user: " + e.getMessage());
            e.printStackTrace();
            return "ID was not created, an error occurred: " + e.getMessage();
        }
    }

    // TODO: update these updatePages and updateLeaveTime functions to include a message and status, preferably with my own errors or whatever
    // additionally, change 504 to 500, update functions for nullptr safety, and the fact that I am required to update every stat from UPDATE_TOTAL_STAT
    // this is kind of a mess right now, but theoretically it functions poorly. Daryk, do better :)

    protected static int updatePagesStat(String id, List<String> pagesVisited) {
        final String sanitizedId = Utils.SanitizeId(id);
        if (sanitizedId == null) {
            return 417; // "Expectation Failed"
        }
        try (Connection conn = getConnection(); PreparedStatement preState = conn.prepareStatement(STAT_PAGES_UPDATE);) {
            preState.setObject(1, pagesVisited.toArray());
            preState.setString(2, sanitizedId);
            preState.executeUpdate();
            return 200;
        } catch (SQLException e) {
            System.err.println("Error updating stats: " + e.getMessage());
            e.printStackTrace();
            return 504;
        }
    }

    protected static int updateLeaveTimeStat(String id, Long leaveTime) {
        final String sanitizedId = Utils.SanitizeId(id);
        if (sanitizedId == null) {
            return 417;
        }
        try (Connection conn = getConnection(); PreparedStatement preState = conn.prepareStatement(STAT_LEAVE_TIME_UPDATE);) {
            preState.setLong(1, leaveTime);
            preState.setString(2, sanitizedId);
            preState.executeUpdate();
            return 200;
        } catch (SQLException e) {
            System.err.println("Error updating stats: " + e.getMessage());
            e.printStackTrace();
            return 504;
        }
    }

    protected static int updateStat(StatUpdate update) {
        update.id = Utils.SanitizeId(update.id);
        if (update.id == null) {
            return 417;
        }
        try (Connection conn = getConnection(); PreparedStatement preState = conn.prepareStatement(STAT_TOTAL_UPDATE);) {
            if (update.leaveTime != null) {
                preState.setLong(1, update.leaveTime);
            }
            if (update.pagesVisited != null) {
                preState.setObject(2, update.pagesVisited.toArray());
            }
            preState.setString(3, update.id);
            preState.executeUpdate();
            return 200;
        } catch (SQLException e) {
            System.err.println("Error updating stats: " + e.getMessage());
            e.printStackTrace();
            return 504;
        }
    }
}
