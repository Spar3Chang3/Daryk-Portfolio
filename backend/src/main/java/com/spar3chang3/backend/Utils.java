package com.spar3chang3.backend;

import java.util.regex.Pattern;

public class Utils {

    public static final String ID_REGEX = "^[0-9L-]+$"; // L for the longs in-case of a format issue

    public static final Pattern ID_PATTERN;

    static {
        ID_PATTERN = Pattern.compile(ID_REGEX);
    }

    public static String CreateId() {
        final long unixTime = System.currentTimeMillis();
        final int randomNum = (int) Math.floor(Math.random() * 100_000);

        return String.format("%d-%d", unixTime, randomNum);
    }

    public static String SanitizeId(String id) {
        if (id == null || id.trim().isEmpty()) {
            return null;
        }

        if (ID_PATTERN.matcher(id).matches()) {
            return id;
        } else {
            System.err.println("INVALID ID DETECTED - SECURITY CONCERN");
            return null;
        }
    }
}
