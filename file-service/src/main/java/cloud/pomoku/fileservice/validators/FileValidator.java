package cloud.pomoku.fileservice.validators;

import cloud.pomoku.fileservice.annotations.ValidConfigurableFile;
import cloud.pomoku.fileservice.config.FileStorageProperties;
import cloud.pomoku.fileservice.exceptions.validation.FileExtensionValidationException;
import cloud.pomoku.fileservice.exceptions.validation.FileTypeValidationException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
public class FileValidator implements ConstraintValidator<ValidConfigurableFile, MultipartFile> {
    private final FileStorageProperties properties;

    @Override
    public void initialize(ValidConfigurableFile constraintAnnotation) {
    }

    @Override
    public boolean isValid(@NonNull MultipartFile file, ConstraintValidatorContext constraintValidatorContext) {

        if (properties.getAllowedTypes() != null && !properties.getAllowedTypes().isEmpty()) {
            boolean validContentType = properties.getAllowedTypes().contains(file.getContentType());
            if (!validContentType) {
                throw new FileTypeValidationException(file.getContentType());
            }
        }

        if (properties.getAllowedExtensions() != null && !properties.getAllowedExtensions().isEmpty()) {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename != null) {
                String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
                boolean validExtension = properties.getAllowedExtensions().contains(extension);
                if (!validExtension) {
                    throw new FileExtensionValidationException(extension);
                }
            }
        }

        //TODO: Validate file content

        return true;
    }
}
