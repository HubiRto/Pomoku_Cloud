package cloud.pomoku.onedockservice.repository;

import cloud.pomoku.onedockservice.entities.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    boolean existsByName(String name);
}
