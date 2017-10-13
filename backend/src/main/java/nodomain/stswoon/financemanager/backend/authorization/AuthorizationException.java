package nodomain.stswoon.financemanager.backend.authorization;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static nodomain.stswoon.financemanager.backend.authorization.AuthorizationException.PERMISSION_DENIED;

@ResponseStatus(code = HttpStatus.FORBIDDEN, value = HttpStatus.FORBIDDEN, reason = PERMISSION_DENIED)
public class AuthorizationException extends RuntimeException {
    static final String PERMISSION_DENIED = "Permission Denied";

    public AuthorizationException() {
        super(PERMISSION_DENIED);
    }
}
