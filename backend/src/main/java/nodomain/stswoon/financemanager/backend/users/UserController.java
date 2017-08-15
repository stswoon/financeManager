package nodomain.stswoon.financemanager.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.codec.digest.DigestUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    DataSource dataSource;

    @RequestMapping("/user/list")
    public List<UserDto> getUsers() {
        try (Connection connection = dataSource.getConnection()) {
            Statement stmt = connection.createStatement();
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name text, password text)");
            stmt.executeUpdate("INSERT INTO Users VALUES (0,'Johnson','qwerty')");
            stmt.executeUpdate("INSERT INTO Users VALUES (1,'Smith','qwerty')");
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<UserEntity> userEntities = (List<UserEntity>) userRepository.findAll();
        List<UserDto> userDtos = userEntities.stream()
                .map(userEntity -> new UserDto(userEntity.getName()))
                .collect(Collectors.toList());
        return userDtos;
    }


    @RequestMapping("/user/register")
    public void registration(@RequestBody Map<String, String> data) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(data.get("name"));
        String hash = DigestUtils.md5Hex(data.get("password"));
        userEntity.setPassword(hash);
        userRepository.save(userEntity);
    }
}
