package nodomain.stswoon.financemanager.auth.security;

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
public class TestData {
    private final DataSource dataSource;

    @Autowired
    public TestData(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
    public void initTestData() {
        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();

//            http://www.mkyong.com/spring-security/spring-security-form-login-using-database/
            //move to scheme.sql
            statement.executeUpdate("DROP TABLE users");
            statement.executeUpdate("DROP TABLE user_roles");

            statement.executeUpdate("CREATE  TABLE users (\n" +
                    "  username VARCHAR(45) NOT NULL ,\n" +
                    "  password VARCHAR(45) NOT NULL ,\n" +
                    "  enabled TINYINT NOT NULL DEFAULT 1 ,\n" +
                    "  PRIMARY KEY (username));");
            statement.executeUpdate("CREATE TABLE user_roles (\n" +
                    "  user_role_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\n" +
                    "  username varchar(45) NOT NULL,\n" +
                    "  role varchar(45) NOT NULL);");
//                    "  role varchar(45) NOT NULL,\n" +
                    //"  PRIMARY KEY (user_role_id),\n" +
                    //"  UNIQUE KEY uni_username_role (role,username),\n" +
                    //"  KEY fk_username_idx (username),\n" +
                    //"  CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES users (username));");
            statement.executeUpdate("INSERT INTO users(username,password,enabled)\n" +
                    "VALUES ('mkyong','123456', 1);\n" +
                    "INSERT INTO users(username,password,enabled)\n" +
                    "VALUES ('alex','123456', 1);\n" +
                    "\n" +
                    "INSERT INTO user_roles (username, role)\n" +
                    "VALUES ('mkyong', 'ROLE_USER');\n" +
                    "INSERT INTO user_roles (username, role)\n" +
                    "VALUES ('mkyong', 'ROLE_ADMIN');\n" +
                    "INSERT INTO user_roles (username, role)\n" +
                    "VALUES ('alex', 'ROLE_USER');");
        } catch (SQLException e) {
            log.error("Failed to init test DB data", e);
        }
    }
}
