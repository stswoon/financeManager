package nodomain.stswoon.financemanager.backend.testdata;

import lombok.extern.slf4j.Slf4j;
import nodomain.stswoon.financemanager.backend.operations.OperationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.*;
import java.util.Calendar;
import java.util.TimeZone;

@Slf4j
@Component
public class TestData {
    @Value("${createTestData}")
    private boolean createTestData;

    private final DataSource dataSource;

    @Autowired
    public TestData(@Qualifier("dataSource") DataSource dataSource) {
        this.dataSource = dataSource;
    }

//    @PostConstruct
//    public void initDb() {
//        try (Connection connection = dataSource.getConnection()) {
//            Statement statement = connection.createStatement();
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, login text, password text)");
//
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS OperationTypes (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, description)");
//            statement.executeUpdate("INSERT INTO OperationTypes (id, description) SELECT * FROM (SELECT 0, 'plus') AS tmp WHERE NOT EXISTS (SELECT id FROM OperationTypes WHERE id = 0)"); //https://www.codeproject.com/Questions/1090743/Mysql-insert-record-if-not-exists-already
//            statement.executeUpdate("INSERT INTO OperationTypes (id, description) SELECT * FROM (SELECT 1, 'minus') AS tmp WHERE NOT EXISTS (SELECT id FROM OperationTypes WHERE id = 0)"); //https://www.codeproject.com/Questions/1090743/Mysql-insert-record-if-not-exists-already
//
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS Operations (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, projectId INTEGER NOT NULL, operationTypeId INTEGER NOT NULL, value INTEGER, comment text, date DATE)");
//
//            statement.executeUpdate("CREATE TABLE IF NOT EXISTS Projects (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, userId INTEGER NOT NULL, login text)");
//
//            if (createTestData) {
//                createTestData(statement);
//            }
//        } catch (SQLException e) {
//            log.error("Failed to init DB structure", e);
//        }
//    }

    @PostConstruct
    public void initTestData() {
        if (!createTestData) {
            return;
        }

        try (Connection connection = dataSource.getConnection()) {
            Statement statement = connection.createStatement();
            //user_id = 2 is alex from nodomain.stswoon.financemanager.auth.users.UserTestData
            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (1, 'Test Project', 2)");
            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (2, 'My Project', 2)");
            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (3, 'My Second Project', 2)");
            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (4, 'My Second Project', 1)");

            String operationInsertSql = "INSERT INTO Operations (id, comment, date, operation_type_id, project_id, value) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement operationInsert = connection.prepareStatement(operationInsertSql);
            insertOperation(operationInsert, 1, "Breakfast", OperationType.MINUS, 150);
            insertOperation(operationInsert, 2, "Salary", OperationType.PLUS, 1000);
            insertOperation(operationInsert, 3, "Clothes", OperationType.MINUS, 250);
            insertOperation(operationInsert, 4, "Lunch", OperationType.MINUS, 190);
            insertOperation(operationInsert, 5, "Additional money", OperationType.PLUS, 30);
            insertOperation(operationInsert, 6, "Online gaming", OperationType.MINUS, 80);
            insertOperation(operationInsert, 7, "Dinner", OperationType.MINUS, 20);
        } catch (SQLException e) {
            log.error("Failed to init test DB data", e);
        }
    }

    private void insertOperation(PreparedStatement statement, long id, String comment, OperationType operationType,
                                 Integer value) throws SQLException {
        statement.setLong(1, id);
        statement.setString(2, comment);
        statement.setDate(3, createDate(30, 8, 2017));
        statement.setInt(5, 2); //2 - id of My Project
        statement.setLong(4, operationType.getOperationTypeId());
        statement.setInt(6, value); //-150rub
        statement.execute();
    }

    private Date createDate(int dayInMonth, int month, int year) {
        //https://habrahabr.ru/post/274811/
        TimeZone tz = TimeZone.getTimeZone("UTC");

        Calendar calendar = Calendar.getInstance(tz);
        calendar.setLenient(false);
        calendar.set(year, month, dayInMonth, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return new Date(calendar.getTime().getTime());
    }
}
