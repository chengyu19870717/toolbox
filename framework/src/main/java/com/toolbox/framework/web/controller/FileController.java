package com.toolbox.framework.web.controller;

import com.toolbox.framework.file.FileService;
import com.toolbox.framework.file.UploadedFile;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public UploadedFile upload(@RequestParam("file") MultipartFile file,
                               @AuthenticationPrincipal String username) throws IOException {
        return fileService.upload(file, username);
    }

    @GetMapping("/download/{taskId}/{filename}")
    public ResponseEntity<Resource> download(@AuthenticationPrincipal String username,
                                             @PathVariable String taskId,
                                             @PathVariable String filename) {
        Path file = fileService.resolveArtifact(username, taskId, filename);
        Resource resource = new PathResource(file);

        String encoded = URLEncoder.encode(filename, StandardCharsets.UTF_8).replace("+", "%20");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encoded)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
