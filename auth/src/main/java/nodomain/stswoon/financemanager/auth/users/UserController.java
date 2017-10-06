package nodomain.stswoon.financemanager.auth.users;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class UserController {
    private final UserRepository userRepository;
    private final PasswordHashService passwordHashService;

    @Autowired
    public UserController(UserRepository userRepository, PasswordHashService passwordHashService) {
        this.userRepository = userRepository;
        this.passwordHashService = passwordHashService;
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
        String hash = passwordHashService.hash(userDto.getPassword());
        userEntity.setPassword(hash);
        userRepository.save(userEntity);

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
