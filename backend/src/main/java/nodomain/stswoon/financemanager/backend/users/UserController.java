package nodomain.stswoon.financemanager.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.apache.commons.codec.digest.DigestUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

//    @RequestMapping(value = "/user", method = GET)
//    public List<UserDto> getList() {
//        List<UserEntity> entities = (List<UserEntity>) userRepository.findAll();
//        List<UserDto> dtos = entities.stream()
//                .map(userEntity -> new UserDto(userEntity.getId(), userEntity.getName(), null))
//                .collect(Collectors.toList());
//        return dtos;
//    }

    @RequestMapping(value = "/user", method = POST)
    public void create(@RequestBody UserDto userDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(userDto.getName());
        String hash = DigestUtils.md5Hex(userDto.getPassword());
        userEntity.setPassword(hash);
        //todo check capcha
        userRepository.save(userEntity);
    }

    @RequestMapping(value = "/user/{id}", method = DELETE)
    public void remove(@PathVariable Long id) {
        userRepository.delete(id);
    }

    @RequestMapping(value = "/user/{id}", method = PUT)
    public void update(@PathVariable Long id, @RequestParam String newPassword, @RequestParam String oldPassword) {
        UserEntity userEntity = userRepository.findOne(id);
        if (userEntity.getPassword().equals(DigestUtils.md5Hex(oldPassword))) {
            userEntity.setPassword(DigestUtils.md5Hex(newPassword));
        }
        userRepository.save(userEntity);
    }

}
