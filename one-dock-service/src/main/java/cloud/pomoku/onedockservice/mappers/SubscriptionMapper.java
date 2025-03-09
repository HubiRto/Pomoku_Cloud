package cloud.pomoku.onedockservice.mappers;

import cloud.pomoku.onedockservice.dto.requests.CreateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.requests.UpdateSubscriptionRequest;
import cloud.pomoku.onedockservice.dto.responses.SubscriptionResponse;
import cloud.pomoku.onedockservice.entities.Subscription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface SubscriptionMapper {
    @Mapping(source = "category.id", target = "categoryId")
    SubscriptionResponse toDto(Subscription subscription);

    @Mapping(target = "category", ignore = true)
    Subscription toEntity(CreateSubscriptionRequest request);

    @Mappings({
            @Mapping(target = "category", ignore = true),
            @Mapping(target = "name", ignore = true)
    })
    Subscription toEntity(UpdateSubscriptionRequest request);
}
