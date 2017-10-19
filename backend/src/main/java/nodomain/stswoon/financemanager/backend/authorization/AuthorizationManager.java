package nodomain.stswoon.financemanager.backend.authorization;

import lombok.extern.slf4j.Slf4j;
import nodomain.stswoon.financemanager.backend.config.ApplicationProperties;
import nodomain.stswoon.financemanager.backend.security.UserService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Check entity against user rights
 */
@Service
@Slf4j
public class AuthorizationManager {
    public enum EntityType {PROJECT, OPERATION, USER}

    final private UserService userService;
    final private List<AuthorizationChecker> authorizationCheckers; //sorted by order (http://javapapers.com/spring/spring-order-annotation/)

    @Inject
    public AuthorizationManager(UserService userService, List<AuthorizationChecker> authorizationCheckers) {
        this.userService = userService;
        this.authorizationCheckers = authorizationCheckers;
    }

    /**
     * Check entity against user rights
     * @param entityType type
     * @param entityId id
     * @return true if user has ro\rw right else false
     */
    public boolean hasAccess(@NotNull EntityType entityType, @NotNull Long entityId) {
        if (entityType == null) {
            throw new IllegalArgumentException("Parameter 'entityType' should not be null");
        }
        if (entityId == null) {
            throw new IllegalArgumentException("Parameter 'entityId' should not be null");
        }

        UserService.User user = userService.getUser();
        log.info("Check rights of '{}' entity with entityId = {} for user '{}' (userId = {})",
                entityType, entityId, user.getLogin(), user.getId());

        for (AuthorizationChecker authorizationChecker : authorizationCheckers) {
            if (authorizationChecker.getEntityType() == entityType) {
                boolean result = authorizationChecker.check(entityId, user.getId());
                if (result == false) {
                    return false;
                }
            }
        }
        return true;
    }
}