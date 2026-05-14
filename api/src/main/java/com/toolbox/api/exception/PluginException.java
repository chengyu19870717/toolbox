package com.toolbox.api.exception;

public class PluginException extends ToolBoxException {
    public PluginException(String message) { super(message); }
    public PluginException(String message, Throwable cause) { super(message, cause); }
}
