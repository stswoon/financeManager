package nodomain.stswoon.financemanager.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.core.Ordered;
import org.springframework.core.PriorityOrdered;
import org.springframework.core.annotation.Order;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class ApplicationProperties implements PriorityOrdered {
    private static String dbUrl;
    private static String authUrl;
    private static boolean disableOAuth2;
    private static boolean createTestData;

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
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

    public static String getDbUrl() {
        return dbUrl;
    }

    public static String getAuthUrl() {
        return authUrl;
    }

    public static boolean isDisableOAuth2() {
        return disableOAuth2;
    }

    public static boolean isCreateTestData() {
        return createTestData;
    }
}
