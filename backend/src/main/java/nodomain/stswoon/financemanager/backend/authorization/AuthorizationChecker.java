package nodomain.stswoon.financemanager.backend.authorization;

import javax.validation.constraints.NotNull;

/**
 * Check rights. Can be annotated by {@link org.springframework.core.annotation.Order @Order}.
 */
public interface AuthorizationChecker {
    /**
     * Check user rights against entity
     * @return true\false
     */
    boolean check(@NotNull Long entityId, @NotNull Long userId);

    /**
     * @return entityType which against this checker is used.
     */
    @NotNull AuthorizationManager.EntityType getEntityType(); //maybe move to check or as annotation
}
