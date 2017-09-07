package nodomain.stswoon.financemanager.auth.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.codec.digest.DigestUtils;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

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

    @RequestMapping(value = "/users", method = GET)
    public List<UserDto> users() {
        List<UserDto> dtos = new ArrayList<>();
        Iterator<UserEntity> it = userRepository.findAll().iterator();
        for (;it.hasNext();) {
            UserEntity entity = it.next();
            dtos.add(new UserDto(entity.getId(), entity.getLogin(), null));
        }
        return dtos;
    }

    @RequestMapping(value = "/user/login", method = POST)
    public UserDto login(@RequestBody UserDto userDto) {
        List<UserEntity> entities = (List<UserEntity>) userRepository.findByLogin(userDto.getLogin());
        if (entities.isEmpty()) {
            throw new RuntimeException("no users"); //todo
        }
        UserEntity userEntity = entities.get(0);
        if (!userEntity.getPassword().equals(passwordHashService.hash(userDto.getPassword()))) {
            throw new RuntimeException("password not match"); //todo
        }
        //todo check capcha

        return new UserDto(userEntity.getId(), userEntity.getLogin(), null);
    }

    @PreAuthorize("#oauth2.hasScope('server')")
    @RequestMapping(value = "/user", method = POST)
    public UserDto create(@RequestBody UserDto userDto) {
        List<UserEntity> entities = (List<UserEntity>) userRepository.findByLogin(userDto.getLogin());
        if (!entities.isEmpty()) {
            throw new RuntimeException("already exist"); //todo
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setLogin(userDto.getLogin());
        String hash = passwordHashService.hash(userDto.getPassword());
        userEntity.setPassword(hash);
        //todo check capcha
        userRepository.save(userEntity);

        entities = (List<UserEntity>) userRepository.findByLogin(userDto.getLogin());
        userEntity = entities.get(0);
        return new UserDto(userEntity.getId(), userEntity.getLogin(), null);
    }

    @RequestMapping(value = "/user/{id}", method = DELETE)
    public void remove(@PathVariable Long id, @RequestParam String password) {
        //todo chck passord
        userRepository.delete(id);
    }

    @RequestMapping(value = "/user/{id}", method = PUT)
    public void update(@PathVariable Long id, @RequestBody UserDto userDto, @RequestParam String oldPassword) {
        UserEntity userEntity = userRepository.findOne(id);
        if (userEntity.getPassword().equals(DigestUtils.md5Hex(oldPassword))) {
            userEntity.setPassword(passwordHashService.hash(userDto.getPassword()));
        }
        userRepository.save(userEntity);
    }
}
