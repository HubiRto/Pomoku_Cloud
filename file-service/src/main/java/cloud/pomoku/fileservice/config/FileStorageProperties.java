package cloud.pomoku.fileservice.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Data
@Configuration
@ConfigurationProperties(prefix = "file.storage")
public class FileStorageProperties {
    private String location;
    private int hashSections;
    private int sectionSize;
    private List<String> allowedTypes;
    private List<String> allowedExtensions;
}
