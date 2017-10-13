package nodomain.stswoon.financemanager.backend.user;

import nodomain.stswoon.financemanager.backend.authorization.AuthorizationChecker;
import nodomain.stswoon.financemanager.backend.authorization.AuthorizationManager;
import org.springframework.stereotype.Component;

@Component
public class UserAuthorizationChecker implements AuthorizationChecker {
    @Override
    public boolean check(Long userId, Long realUserId) {
            return realUserId.equals(userId);
    }

    @Override
    public AuthorizationManager.EntityType getEntityType() {
        return AuthorizationManager.EntityType.USER;
    }
}
