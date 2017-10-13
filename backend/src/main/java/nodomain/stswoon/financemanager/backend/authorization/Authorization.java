package nodomain.stswoon.financemanager.backend.authorization;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Check user right to read\write object. Throw {@link AuthorizationException} in case of right violation.
 * Can be applied to method with id parameter. Id should be Long.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authorization {
    /**
     * Type of entity to check rights against
     */
    AuthorizationManager.EntityType entityType();

    /**
     * Number of entity ID parameter in method (default is 0)
     */
    int idParameterPosition() default 0; //means take first
}
