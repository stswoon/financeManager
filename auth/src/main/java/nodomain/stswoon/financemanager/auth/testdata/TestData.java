package nodomain.stswoon.financemanager.auth.testdata;

import lombok.extern.slf4j.Slf4j;
import nodomain.stswoon.financemanager.auth.users.PasswordHashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Slf4j
@Component
public class TestData {
    @Value("${createTestData}")
    private boolean createTestData;

    private final DataSource dataSource;
    private final PasswordHashService passwordHashService;

    @Autowired
    public TestData(DataSource dataSource, PasswordHashService passwordHashService) {
        this.dataSource = dataSource;
        this.passwordHashService = passwordHashService;
    }

    @PostConstruct
    public void initTestData() {
        if (!createTestData) {
            return;
        }

        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();

            statement.executeUpdate("INSERT INTO Users (id, login, password) VALUES (1, 'Johnson', 'qwerty')");
            statement.executeUpdate("INSERT INTO Users (id, login, password) VALUES (2, 'Smith', 'password')");
            statement.executeUpdate("INSERT INTO Users (id, login, password) VALUES (3, 'Ivan', 'qwerty12')");
            statement.executeUpdate("INSERT INTO Users (id, login, password) VALUES (4, 'Ivan2', '"
                    + passwordHashService.hash("password") + "')");
        } catch (SQLException e) {
            log.error("Failed to init test DB data", e);
        }
    }
}
