package nodomain.stswoon.financemanager.auth.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Slf4j
@Component
public class UserTestData {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @Autowired
    public UserTestData(UserRepository userRepository, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }

    @PostConstruct
    public void initTestData() {
        userRepository.save(new UserEntity("mkyong", "123456"));
        userRepository.save(new UserEntity("alex", "123456"));
        userRoleRepository.save(new UserRoleEntity("mkyong", "ROLE_ADMIN"));
        userRoleRepository.save(new UserRoleEntity("mkyong", "ROLE_USER"));
        userRoleRepository.save(new UserRoleEntity("alex", "ROLE_USER"));
    }
}
