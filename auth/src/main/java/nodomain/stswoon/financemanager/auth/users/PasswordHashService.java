package nodomain.stswoon.financemanager.auth.users;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

@Service
public class PasswordHashService {
    public String hash(String password) {
        return DigestUtils.md5Hex(password);
    }
}
