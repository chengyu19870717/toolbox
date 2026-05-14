package com.toolbox.api.exception;

public class ToolBoxException extends RuntimeException {

    private final String errorCode;

    public ToolBoxException(String message) {
        super(message);
        this.errorCode = null;
    }

    public ToolBoxException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = null;
    }

    public ToolBoxException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode() { return errorCode; }
}
