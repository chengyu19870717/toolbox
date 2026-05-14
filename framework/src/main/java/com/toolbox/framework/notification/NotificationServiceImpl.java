package com.toolbox.framework.notification;

import com.toolbox.api.notification.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class NotificationServiceImpl implements NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    // username → SSE emitter 列表（前端通知频道）
    private final Map<String, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    @Override
    public void send(String username, NotificationLevel level, String message) {
        List<SseEmitter> list = emitters.get(username);
        if (list == null || list.isEmpty()) {
            log.debug("Notification dropped (user not online): [{}] {} - {}", level, username, message);
            return;
        }
        Map<String, String> payload = Map.of("level", level.name(), "message", message);
        list.removeIf(emitter -> {
            try {
                emitter.send(SseEmitter.event().name("notification").data(payload));
                return false;
            } catch (Exception e) {
                return true;
            }
        });
    }

    public SseEmitter subscribeNotifications(String username) {
        SseEmitter emitter = new SseEmitter(0L); // 永不超时，靠前端重连
        emitters.computeIfAbsent(username, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitter.onCompletion(() -> removeEmitter(username, emitter));
        emitter.onTimeout(() -> removeEmitter(username, emitter));
        emitter.onError(e -> removeEmitter(username, emitter));
        return emitter;
    }

    private void removeEmitter(String username, SseEmitter emitter) {
        List<SseEmitter> list = emitters.get(username);
        if (list != null) list.remove(emitter);
    }
}
