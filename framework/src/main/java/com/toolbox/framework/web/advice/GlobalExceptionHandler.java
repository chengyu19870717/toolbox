package com.toolbox.framework.web.advice;

import com.toolbox.api.exception.DataSourceException;
import com.toolbox.api.exception.ToolBoxException;
import com.toolbox.api.exception.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(DataSourceException.class)
    public ResponseEntity<Map<String, Object>> handleDataSource(DataSourceException e) {
        log.warn("DataSource error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(error("DATASOURCE_ERROR", e.getMessage()));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(ValidationException e) {
        return ResponseEntity.badRequest().body(error("VALIDATION_ERROR", e.getMessage()));
    }

    @ExceptionHandler(ToolBoxException.class)
    public ResponseEntity<Map<String, Object>> handleToolBox(ToolBoxException e) {
        log.warn("Business error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error(e.getErrorCode() != null ? e.getErrorCode() : "TOOLBOX_ERROR", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleUnknown(Exception e) {
        log.error("Unexpected error", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error("INTERNAL_ERROR", "服务器内部错误，请联系管理员"));
    }

    private Map<String, Object> error(String code, String message) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("code", code);
        body.put("message", message);
        return body;
    }
}
