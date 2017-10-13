package nodomain.stswoon.financemanager.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.annotation.Order;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
//@ConfigurationProperties(prefix = "test") //https://stackoverflow.com/a/45193356
//@PropertySource()
public class ApplicationProperties implements PriorityOrdered{
    public static String dbUrl;
    public static String authUrl;
    public static boolean disableOAuth2;
    public static boolean createTestData;
    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    public ApplicationProperties() {
        int x = 0;
    }

    @Autowired
    @Value("${spring.datasource.url}")
    void setDbUrl(String dbUrl) {
        ApplicationProperties.dbUrl = dbUrl;
    }

    @Value("${auth-server}")
    void setAuthUrl(String authUrl) {
        ApplicationProperties.authUrl = authUrl;
    }

    @Value("${disableOAuth2}")
    void setDisableOAuth2(boolean disableOAuth2) {
        ApplicationProperties.disableOAuth2 = disableOAuth2;
    }

    @Value("${createTestData}")
    void setCreateTestData(boolean createTestData) {
        ApplicationProperties.createTestData = createTestData;
    }
}
