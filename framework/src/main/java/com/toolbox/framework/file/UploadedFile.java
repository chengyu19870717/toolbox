package com.toolbox.framework.file;

import java.time.Instant;

public record UploadedFile(
        String fileId,
        String originalName,
        String path,
        long sizeBytes,
        String contentType,
        Instant uploadedAt
) {}
