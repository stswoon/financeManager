package nodomain.stswoon.financemanager.backend.config;

import lombok.extern.slf4j.Slf4j;
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
public class InitDb {
//    @Value("${createTestData}")
//    private boolean createTestData;
//
//    private DataSource dataSource;
//
//    @Autowired
//    public InitDb(DataSource dataSource) {
//        this.dataSource = dataSource;
//    }
//
//    @PostConstruct
//    public void init() {
//        if (true) return;
//
//        try (Connection connection = dataSource.getConnection()) {
//            Statement statement = connection.createStatement();
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name text, password text)");
//
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS OperationTypes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, description)");
//            statement.executeUpdate("INSERT INTO OperationTypes (id, description) SELECT * FROM (SELECT 0, 'plus') AS tmp WHERE NOT EXISTS (SELECT id FROM OperationTypes WHERE id = 0)"); //https://www.codeproject.com/Questions/1090743/Mysql-insert-record-if-not-exists-already
//            statement.executeUpdate("INSERT INTO OperationTypes (id, description) SELECT * FROM (SELECT 1, 'minus') AS tmp WHERE NOT EXISTS (SELECT id FROM OperationTypes WHERE id = 0)"); //https://www.codeproject.com/Questions/1090743/Mysql-insert-record-if-not-exists-already
//
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS Operations (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, projectId INTEGER NOT NULL, operationTypeId INTEGER NOT NULL, value INTEGER, comment text, date DATE)");
//
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS Projects (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, userId INTEGER NOT NULL, name text)");
//
////            statement.executeUpdate("CREATE TABLE IF NOT EXISTS ProjectOperationBindings (oerationId INTEGER NOT NULL, projectId INTEGER NOT NULL)");
//
//            if (createTestData) {
//                createTestData(statement);
//            }
//        } catch (SQLException e) {
//            log.error("Failed to init DB structure", e);
//        }
//    }
//
//    private void createTestData(Statement statement) throws SQLException {
//        statement.executeUpdate("INSERT INTO Users VALUES (1, 'Johnson', 'qwerty')");
//        statement.executeUpdate("INSERT INTO Users VALUES (2, 'Smith', 'password')");
//        statement.executeUpdate("INSERT INTO Users VALUES (3, 'Ivan', 'qwerty12')");
//
//        statement.executeUpdate("INSERT INTO Projects VALUES (1, 1, 'Test project')");
//    }
}
