package com.toolbox.api.notification;

public interface NotificationService {

    void send(String username, NotificationLevel level, String message);

    default void info(String username, String message) { send(username, NotificationLevel.INFO, message); }
    default void success(String username, String message) { send(username, NotificationLevel.SUCCESS, message); }
    default void warning(String username, String message) { send(username, NotificationLevel.WARNING, message); }
    default void error(String username, String message) { send(username, NotificationLevel.ERROR, message); }

    enum NotificationLevel { INFO, SUCCESS, WARNING, ERROR }
}
