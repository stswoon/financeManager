package nodomain.stswoon.financemanager.backend.authorization;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@Aspect
@Component
public class AuthorizationAspect {
    @Autowired
    AuthorizationManager authorizationManager;

    @Before("@annotation(nodomain.stswoon.financemanager.backend.authorization.Authorization)")
    public void checkAuthorization(JoinPoint joinPoint) {
        log.info("Check rights for {}", joinPoint);
        Method method = ((MethodSignature)joinPoint.getSignature()).getMethod();
        Authorization authorization = method.getAnnotation(Authorization.class);
        Long id = (Long) joinPoint.getArgs()[authorization.idParameterPosition()];
        authorizationManager.hasAccess(authorization.entityType(), id);
    }

}
