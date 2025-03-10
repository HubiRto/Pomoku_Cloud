package cloud.pomoku.fileservice.utils;

import cloud.pomoku.fileservice.exceptions.FileHashingException;
import cloud.pomoku.fileservice.exceptions.InvalidHashException;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public class HashGenerator {
    public static String generateHash(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            return DigestUtils.sha256Hex(is);
        } catch (IOException e) {
            throw new FileHashingException(file.getOriginalFilename());
        }
    }

    public static String generatePathFromHash(String hash, int hashSections, int sectionSize) {
        if (hash == null) {
            throw new NullPointerException("Hash cannot be null");
        }

        int requiredLength = hashSections * sectionSize;
        if (hash.length() < requiredLength) {
            throw new InvalidHashException("Hash is too short to generate path with specified sections");
        }

        StringBuilder pathBuilder = new StringBuilder();

        int position = 0;
        for (int i = 0; i < hashSections; i++) {
            pathBuilder.append(hash, position, position + sectionSize).append("/");
            position += sectionSize;
        }

        pathBuilder.append(hash.substring(position));
        return pathBuilder.toString();
    }
}
