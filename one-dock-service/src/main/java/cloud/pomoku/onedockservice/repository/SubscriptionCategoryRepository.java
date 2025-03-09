package cloud.pomoku.onedockservice.repository;

import cloud.pomoku.onedockservice.entities.SubscriptionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionCategoryRepository extends JpaRepository<SubscriptionCategory, Long> {
    Optional<SubscriptionCategory> findByName(String name);
}
