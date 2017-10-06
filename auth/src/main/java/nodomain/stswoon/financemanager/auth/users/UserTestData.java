package nodomain.stswoon.financemanager.auth.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class UserTestData {
    @Value("${createTestData}")
    private boolean createTestData;

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @Autowired
    public UserTestData(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @PostConstruct
    public void initTestData() {
        if (!createTestData) {
            return;
        }

        userRepository.save(new UserEntity("mkyong", "123456"));
        userRepository.save(new UserEntity("alex", "123456"));
        userRoleRepository.save(new UserRoleEntity("mkyong", "ROLE_ADMIN"));
        userRoleRepository.save(new UserRoleEntity("mkyong", "ROLE_USER"));
        userRoleRepository.save(new UserRoleEntity("alex", "ROLE_USER"));
    }
}
