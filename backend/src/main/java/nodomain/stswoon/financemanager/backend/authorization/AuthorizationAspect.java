package nodomain.stswoon.financemanager.backend.authorization;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.lang.reflect.Method;
import java.text.MessageFormat;

@Slf4j
@Aspect
@Component
class AuthorizationAspect {
    final private AuthorizationManager authorizationManager;

    @Inject
    AuthorizationAspect(AuthorizationManager authorizationManager) {
        this.authorizationManager = authorizationManager;
    }

    @Before("@annotation(nodomain.stswoon.financemanager.backend.authorization.Authorization)")
    public void checkAuthorization(JoinPoint joinPoint) {
        log.info("Check rights for {}", joinPoint);
        Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
        Authorization authorization = method.getAnnotation(Authorization.class);

        //maybe assertion
        if (authorization.idParameterPosition() >= joinPoint.getArgs().length) {
            String result = MessageFormat.format(
                    "@Authorization is set wrong: idParameterPosition = {}, joinPoint.getArgs().length = {}",
                    authorization.idParameterPosition(), joinPoint.getArgs().length);
            throw new IllegalArgumentException(result);
        } else if (!(joinPoint.getArgs()[authorization.idParameterPosition()] instanceof Long)) {
            String result = MessageFormat.format(
                    "@Authorization is set wrong: Argument on position {} is not Long",
                    authorization.idParameterPosition());
            throw new IllegalArgumentException(result);
        }
        Long id = (Long) joinPoint.getArgs()[authorization.idParameterPosition()];

        if (!authorizationManager.hasAccess(authorization.entityType(), id)) {
            throw new AuthorizationException();
        }
    }

}
