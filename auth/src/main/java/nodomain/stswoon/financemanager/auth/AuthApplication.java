package nodomain.stswoon.financemanager.auth;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Properties;

@Configuration
@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableAuthorizationServer
@Slf4j
public class AuthApplication {
    private static SpringApplication springApplication;

    public static void main(String[] args) {
        springApplication = new SpringApplication(AuthApplication.class);
        springApplication.run(args);
    }

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Bean
    public DataSource dataSource() throws SQLException {
        System.out.println("q dbUrl=" + dbUrl);
        log.debug("dbUrl={}", dbUrl);
        if (StringUtils.isEmpty(dbUrl)) {
            Properties properties = new Properties();
            properties.put("hibernate.dialect", "org.hibernate.dialect.SQLiteDialect");
            properties.put("spring.jpa.properties.hibernate.dialect", "org.hibernate.dialect.SQLiteDialect");
            springApplication.setDefaultProperties(properties);
            DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
            dataSourceBuilder.driverClassName("org.sqlite.JDBC");
            dataSourceBuilder.url("jdbc:sqlite:auth/target/localDb.db");
            return dataSourceBuilder.build();
        } else {
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(dbUrl);
            return new HikariDataSource(config);
        }
    }

}
