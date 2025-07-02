package com.spar3chang3.backend;

public class Status<T> {

    private int status;
    private String message;
    private T content;

    private boolean hasContent;

    //JACKSON
    public Status() {}

    public Status(int code, String message, T content) {
        this.status = code;
        this.message = message;
        this.content = content;
        hasContent = true;
    }

    public Status(int code, String message) {
        this.status = code;
        this.message = message;
        this.content = null;
        hasContent = false;
    }

    public Status(StatusCode status, T content) {
        this.status = status.getCode();
        this.message = status.getMessage();
        this.content = content;
        hasContent = true;
    }

    public Status(StatusCode status) {
        this.status = status.getCode();
        this.message = status.getMessage();
        this.content = null;
        hasContent = false;
    }

    public int getCode() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    // Will be returning as string usually since content likely needs to be stringified to begin with

    public T getContent() {
        if (hasContent) {
            return content;
        } else {
            return null;
        }
    }

    public String getContentString() {
        if (hasContent) {
            return content.toString();
        } else {
            return "";
        }
    }

    @Override
    public String toString() {
        return "{" +
                String.format("status: %d, ", status) +
                String.format("message: %s, ", message) +
                String.format("content: %s", content.toString()) +
                "}";
    }
}
