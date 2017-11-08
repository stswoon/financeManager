package nodomain.stswoon.financemanager.auth.users;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@Slf4j
public class UserController {
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordHashService passwordHashService;

    @Autowired
    public UserController(UserRepository userRepository, UserRoleRepository userRoleRepository, PasswordHashService passwordHashService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.passwordHashService = passwordHashService;
    }

    @RequestMapping(value = "/users-test", method = GET)
    public List<Object> test() {
        List<UserEntity> users = new ArrayList<>();
        List<UserRoleEntity> roles = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        userRoleRepository.findAll().forEach(roles::add);
        return Arrays.asList(users, roles);
    }

    @Autowired
    DataSource dataSource;

    @RequestMapping(value = "/users-test-2/{login}", method = GET)
    public String test2(@PathVariable String login) {
        String result = "";
        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();
            statement.execute("SELECT login AS username, password, enabled FROM users WHERE login='"+login+"'");
            statement.execute("SELECT login AS username, role FROM user_roles WHERE login='"+login+"'");

        } catch (SQLException e) {
            log.error("Failed to init DB structure", e);
        }
        return result;
    }


    @RequestMapping(value = "/user/{login}", method = GET)
    public UserDto login(@PathVariable String login) {
        List<UserEntity> entities = userRepository.findByLogin(login);
        if (entities.isEmpty()) {
            throw new RuntimeException("no users");
        }
        UserEntity userEntity = entities.get(0);
        return new UserDto(userEntity.getId(), userEntity.getLogin(), null);
    }

    @RequestMapping(value = "/user", method = POST)
    public UserDto create(@RequestBody UserDto userDto) {
        List<UserEntity> entities = userRepository.findByLogin(userDto.getLogin());
        if (!entities.isEmpty()) {
            throw new RuntimeException("already exist");
        }

        //todo check captcha
        UserEntity userEntity = new UserEntity();
        userEntity.setLogin(userDto.getLogin());
        //String hash = passwordHashService.hash(userDto.getPassword()); //todo
        userEntity.setPassword(userDto.getPassword());
        userRepository.save(userEntity);
        userRoleRepository.save(new UserRoleEntity(userDto.getLogin(), "ROLE_USER"));

        return login(userDto.getLogin());
    }

    @RequestMapping(value = "/user/{id}", method = DELETE)
    public void remove(@PathVariable Long id, @RequestParam String password) {
        //todo check password
        userRepository.delete(id);
    }

    @RequestMapping(value = "/user/{id}", method = PUT)
    public void update(@PathVariable Long id, @RequestBody UserDto userDto, @RequestParam String oldPassword) {
        //todo check password
        UserEntity userEntity = userRepository.findOne(id);
        if (userEntity.getPassword().equals(DigestUtils.md5Hex(oldPassword))) {
            userEntity.setPassword(passwordHashService.hash(userDto.getPassword()));
        }
        userRepository.save(userEntity);
    }
}
