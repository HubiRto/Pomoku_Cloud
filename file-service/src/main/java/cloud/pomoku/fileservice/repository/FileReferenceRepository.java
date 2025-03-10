package cloud.pomoku.fileservice.repository;

import cloud.pomoku.fileservice.entites.FileReference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FileReferenceRepository extends JpaRepository<FileReference, UUID> {
    int countByFileMetadataHash(String hash);
}
