package nodomain.stswoon.financemanager.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.sql.SQLException;

@Profile("cloud")
@Configuration
@EnableAutoConfiguration
@Slf4j
@DependsOn("applicationProperties")
public class BackendConfiguration {
    @Bean
    public DataSource dataSource() throws SQLException {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(ApplicationProperties.getDbUrl());
        return new HikariDataSource(config);
    }
}
