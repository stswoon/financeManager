package nodomain.stswoon.financemanager.backend.health;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

@Slf4j
@RestController
public class DbHelloWorldController {
    private final DataSource dataSource;

    @Autowired
    public DbHelloWorldController(@Qualifier("dataSource") DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @RequestMapping("/health/db")
    public String db() {
        try (Connection connection = dataSource.getConnection()) {
            Statement stmt = connection.createStatement();
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS ticks (tick timestamp)");
            stmt.executeUpdate("INSERT INTO ticks VALUES (now())");
            ResultSet rs = stmt.executeQuery("SELECT tick FROM ticks");

            ArrayList<String> output = new ArrayList<>();
            while (rs.next()) {
                output.add("Read from DB: " + rs.getTimestamp("tick"));
            }
            return "db:test=" + output;
        } catch (Exception e) {
            e.printStackTrace();
            return "db:error";
        }
    }
}