package cloud.pomoku.fileservice.entites;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Builder
@Table(name = "file_metadata")
@NoArgsConstructor
@AllArgsConstructor
public class FileMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String hash;

    @Column(nullable = false)
    private String originalFilename;

    @Column(nullable = false)
    private Long size;

    @Column(nullable = false)
    private String relativePath;

    @Column(nullable = false)
    private String contentType;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime uploadedAt;

    @OneToMany(mappedBy = "fileMetadata", cascade = CascadeType.PERSIST)
    private Set<FileReference> references = new HashSet<>();
}
