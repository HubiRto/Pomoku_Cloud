package cloud.pomoku.onedockservice.services.impl;

import cloud.pomoku.onedockservice.dto.requests.CreateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.requests.UpdateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.responses.SubscriptionResponse;
import cloud.pomoku.onedockservice.entities.Subscription;
import cloud.pomoku.onedockservice.entities.SubscriptionCategory;
import cloud.pomoku.onedockservice.exception.SubscriptionAlreadyExist;
import cloud.pomoku.onedockservice.exception.SubscriptionNotFound;
import cloud.pomoku.onedockservice.mappers.SubscriptionMapper;
import cloud.pomoku.onedockservice.repository.SubscriptionCategoryRepository;
import cloud.pomoku.onedockservice.repository.SubscriptionRepository;
import cloud.pomoku.onedockservice.services.SubscriptionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionCategoryRepository subscriptionCategoryRepository;
    private final SubscriptionMapper subscriptionMapper;

    @Override
    @Transactional
    public SubscriptionResponse createSubscription(CreateSubscriptionRequest request) {
        if (subscriptionRepository.existsByName(request.name())) {
            throw new SubscriptionAlreadyExist();
        }

        SubscriptionCategory category = subscriptionCategoryRepository
                .findByName(request.categoryName())
                .orElse(subscriptionCategoryRepository.save(new SubscriptionCategory(request.categoryName())));

        Subscription subscription = subscriptionMapper.toEntity(request);
        subscription.setCategory(category);

        return subscriptionMapper.toDto(subscriptionRepository.save(subscription));
    }

    @Override
    public Page<SubscriptionResponse> getAllSubscriptions(Pageable pageable) {
        return subscriptionRepository.findAll(pageable).map(subscriptionMapper::toDto);
    }

    @Override
    public SubscriptionResponse getSubscription(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new SubscriptionNotFound(id));
        return subscriptionMapper.toDto(subscription);
    }

    @Override
    @Transactional
    public SubscriptionResponse updateSubscription(Long id, UpdateSubscriptionRequest request) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new SubscriptionNotFound(id));

        SubscriptionCategory category = subscriptionCategoryRepository
                .findByName(request.categoryName())
                .orElse(subscriptionCategoryRepository.save(new SubscriptionCategory(request.categoryName())));

        Subscription newSubscription = subscriptionMapper.toEntity(request);
        newSubscription.setId(id);
        newSubscription.setName(subscription.getName());
        newSubscription.setCategory(category);

        return subscriptionMapper.toDto(subscriptionRepository.save(newSubscription));
    }

    @Override
    @Transactional
    public void deleteSubscription(Long id) {
        if(!subscriptionRepository.existsById(id)) throw new SubscriptionNotFound(id);
        subscriptionRepository.deleteById(id);
    }
}
