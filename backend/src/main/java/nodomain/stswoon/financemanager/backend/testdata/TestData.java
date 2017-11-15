package nodomain.stswoon.financemanager.backend.testdata;

import lombok.extern.slf4j.Slf4j;
import nodomain.stswoon.financemanager.backend.config.ApplicationProperties;
import nodomain.stswoon.financemanager.backend.operations.OperationEntity;
import nodomain.stswoon.financemanager.backend.operations.OperationRepository;
import nodomain.stswoon.financemanager.backend.operations.OperationType;
import nodomain.stswoon.financemanager.backend.projects.ProjectEntity;
import nodomain.stswoon.financemanager.backend.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

@Slf4j
@Component
public class TestData {
    private final ProjectRepository projectRepository;
    private final OperationRepository operationRepository;

    @Autowired
    public TestData(ProjectRepository projectRepository, OperationRepository operationRepository) {
        this.projectRepository = projectRepository;
        this.operationRepository = operationRepository;
    }

    @PostConstruct
    public void initTestData() {
        if (!ApplicationProperties.isCreateTestData()) {
            return;
        }

        projectRepository.save(new ProjectEntity(2L, "Test Project"));
        projectRepository.save(new ProjectEntity(2L, "My Project"));
        projectRepository.save(new ProjectEntity(2L, "My Second Project"));
        projectRepository.save(new ProjectEntity(1L, "My Second Project"));

        Long projectId = projectRepository.findByNameAndUserId("My Project", 2L).getId();
        Date date = createDate(30, 8, 2017);
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 150, "Breakfast", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.PLUS.getOperationTypeId(), 1000, "Salary", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 250, "Clothes", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 190, "Lunch", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.PLUS.getOperationTypeId(), 30, "Additional money", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 80, "Online gaming", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 20, "Dinner", date));

        projectId = projectRepository.findByNameAndUserId("Test Project", 2L).getId();
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 20, "op1", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.PLUS.getOperationTypeId(), 20, "op2", date));
        operationRepository.save(new OperationEntity(projectId, OperationType.MINUS.getOperationTypeId(), 20, "op3", date));
    }


//    @Value("${createTestData}")
//    private boolean createTestData;

//    private final DataSource dataSource;

//    @Autowired
//    public TestData(@Qualifier("dataSource") DataSource dataSource) {
//        this.dataSource = dataSource;
//    }

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

//    @PostConstruct
//    public void initTestData() {
//        if (!ApplicationProperties.isCreateTestData()) {
//            return;
//        }
//
//        try (Connection connection = dataSource.getConnection()) {
//            Statement statement = connection.createStatement();
//            //user_id = 2 is alex from nodomain.stswoon.financemanager.auth.users.UserTestData
//            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (1, 'Test Project', 2)");
//            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (2, 'My Project', 2)");
//            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (3, 'My Second Project', 2)");
//            statement.executeUpdate("INSERT INTO Projects (id, name, user_id) VALUES (4, 'My Second Project', 1)");
//
//            String operationInsertSql = "INSERT INTO Operations (id, comment, date, operation_type_id, project_id, value) " +
//                    "VALUES (?, ?, ?, ?, ?, ?)";
//            PreparedStatement operationInsert = connection.prepareStatement(operationInsertSql);
//            insertOperation(operationInsert, 1, "Breakfast", OperationType.MINUS, 150);
//            insertOperation(operationInsert, 2, "Salary", OperationType.PLUS, 1000);
//            insertOperation(operationInsert, 3, "Clothes", OperationType.MINUS, 250);
//            insertOperation(operationInsert, 4, "Lunch", OperationType.MINUS, 190);
//            insertOperation(operationInsert, 5, "Additional money", OperationType.PLUS, 30);
//            insertOperation(operationInsert, 6, "Online gaming", OperationType.MINUS, 80);
//            insertOperation(operationInsert, 7, "Dinner", OperationType.MINUS, 20);
//
//            //update auto indexes like it does spring rest controller
//            //statement.executeUpdate("update IF EXISTS hibernate_sequence set next_val=10 where next_val=1");//sqlite
//            statement.executeUpdate("ALTER SEQUENCE IF EXISTS hibernate_sequence START 10");//https://postgrespro.ru/docs/postgresql/9.6/sql-altersequence.html
//        } catch (SQLException e) {
//            log.error("Failed to init test DB data", e);
//        }
//    }
//
//    private void insertOperation(PreparedStatement statement, long id, String comment, OperationType operationType,
//                                 Integer value) throws SQLException {
//        statement.setLong(1, id);
//        statement.setString(2, comment);
//        statement.setDate(3, createDate(30, 8, 2017));
//        statement.setLong(4, operationType.getOperationTypeId());
//        statement.setInt(5, 2); //2 - id of My Project
//        statement.setInt(6, value); //-150rub
//        statement.execute();
//    }

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
