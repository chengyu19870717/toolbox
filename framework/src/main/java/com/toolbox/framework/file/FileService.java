package com.toolbox.framework.file;

import com.toolbox.api.exception.ValidationException;
import com.toolbox.framework.config.ToolBoxProperties;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.Instant;
import java.util.UUID;

@Service
public class FileService {

    private static final Logger log = LoggerFactory.getLogger(FileService.class);

    private final ToolBoxProperties props;
    private Path uploadsDir;
    private Path downloadsDir;

    public FileService(ToolBoxProperties props) {
        this.props = props;
    }

    @PostConstruct
    public void init() throws IOException {
        uploadsDir = Path.of(props.getPaths().getTempDir(), "uploads");
        downloadsDir = Path.of(props.getPaths().getTempDir(), "downloads");
        Files.createDirectories(uploadsDir);
        Files.createDirectories(downloadsDir);
    }

    public UploadedFile upload(MultipartFile file, String username) throws IOException {
        String original = file.getOriginalFilename() != null ? file.getOriginalFilename() : "unknown";
        String fileId = UUID.randomUUID().toString();
        String storedName = fileId + "_" + original;

        Path userDir = uploadsDir.resolve(username);
        Files.createDirectories(userDir);
        Path target = userDir.resolve(storedName);
        file.transferTo(target);

        log.info("File uploaded: {} ({} bytes) by {}", original, file.getSize(), username);
        return new UploadedFile(fileId, original, target.toString(), file.getSize(),
                file.getContentType(), Instant.now());
    }

    public Path resolveUploadedFile(String fileId) {
        try {
            return Files.walk(uploadsDir)
                    .filter(p -> p.getFileName().toString().startsWith(fileId + "_"))
                    .findFirst()
                    .orElseThrow(() -> new ValidationException("文件不存在或已过期: " + fileId));
        } catch (IOException e) {
            throw new ValidationException("文件查找失败: " + fileId);
        }
    }

    public Path getArtifactDir(String username, String taskId) throws IOException {
        Path dir = downloadsDir.resolve(username).resolve(taskId);
        Files.createDirectories(dir);
        return dir;
    }

    public Path resolveArtifact(String username, String taskId, String filename) {
        Path file = downloadsDir.resolve(username).resolve(taskId).resolve(filename);
        if (!file.startsWith(downloadsDir)) throw new ValidationException("非法文件路径");
        return file;
    }

    @Scheduled(cron = "0 0 2 * * *")
    public void cleanupTempFiles() {
        int retentionHours = props.getFile().getTempRetentionHours();
        long cutoff = System.currentTimeMillis() - (long) retentionHours * 3600_000;
        cleanDir(uploadsDir, cutoff);
        cleanDir(downloadsDir, cutoff);
    }

    private void cleanDir(Path dir, long cutoff) {
        try {
            Files.walk(dir, 3)
                    .filter(Files::isRegularFile)
                    .filter(p -> {
                        try { return Files.getLastModifiedTime(p).toMillis() < cutoff; }
                        catch (IOException e) { return false; }
                    })
                    .forEach(p -> { try { Files.delete(p); } catch (IOException ignored) {} });
        } catch (IOException e) {
            log.error("Cleanup failed for {}", dir, e);
        }
    }
}
