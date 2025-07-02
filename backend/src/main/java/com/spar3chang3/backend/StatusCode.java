package com.spar3chang3.backend;

public enum StatusCode {
    // 2xx Success
    OK(200, "OK"),
    CREATED(201, "Created"), // Often used for successful POST requests

    // 4xx Client Errors
    BAD_REQUEST(400, "Bad Request"), // General client error, e.g., malformed JSON, invalid input
    NOT_FOUND(404, "Not Found"), // Resource not found
    EXPECTATION_FAILED(417, "Expectation Failed"), // As you used for invalid ID format

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR(500, "Internal Server Error"), // General server-side error (e.g., database error)
    GATEWAY_TIMEOUT(504, "Gateway Timeout"); // Upstream server did not respond (less common for direct app errors)

    private final int code;
    private final String message;

    StatusCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return code + " " + message;
    }
}