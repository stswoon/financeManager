package nodomain.stswoon.financemanager.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.code.AuthorizationCodeServices;
import org.springframework.security.oauth2.provider.code.JdbcAuthorizationCodeServices;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import javax.sql.DataSource;

@Configuration
@EnableAuthorizationServer
public class OAuthConfiguration extends AuthorizationServerConfigurerAdapter {
    private TokenStore tokenStore = new InMemoryTokenStore();

    @Autowired
    private AuthenticationManager auth;

    @Autowired
    private UserDetailsService userDetailsService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private DataSource dataSource;

    /**
     * The OAuth2 tokens are defined in the datasource defined in the
     * <code>auth-server.yml</code> file stored in the Spring Cloud config
     * github repository.
     *
     * @return
     */
    @Bean
    public JdbcTokenStore tokenStore() {
        return new JdbcTokenStore(dataSource);
    }

    @Bean
    protected AuthorizationCodeServices authorizationCodeServices() {
        return new JdbcAuthorizationCodeServices(dataSource);
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security)
            throws Exception {
        security.passwordEncoder(passwordEncoder);
    }

    /**
     * We set our authorization storage feature specifying that we would use the
     * JDBC store for token and authorization code storage.<br>
     * <br>
     *
     * We also attach the {@link AuthenticationManager} so that password grants
     * can be processed.
     */
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints)
            throws Exception {
        endpoints.authorizationCodeServices(authorizationCodeServices())
                .authenticationManager(auth).tokenStore(tokenStore())
                .approvalStoreDisabled();
    }


    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.jdbc(dataSource)
                .passwordEncoder(passwordEncoder)
                .withClient("client")
                .authorizedGrantTypes("authorization_code", "client_credentials",
                        "refresh_token","password", "implicit")
                .authorities("ROLE_CLIENT")
                .resourceIds("apis")
                .scopes("read")
                .secret("secret")
                .accessTokenValiditySeconds(300);
//        clients.inMemory()
//                .withClient("browser")
//                .authorizedGrantTypes("refresh_token", "password")
//                .scopes("ui")
//                .and()
//                .withClient("backend")
////                .secret(env.getProperty("ACCOUNT_SERVICE_PASSWORD"))
//                .secret("mysecret")
//                .authorizedGrantTypes("client_credentials", "refresh_token")
//                .scopes("server")
//                // Allow refresh of the access tokens for 30 minutes (session duration)
//                .refreshTokenValiditySeconds(1800);
//                .and()
//                .withClient("statistics-service")
//                .secret(env.getProperty("STATISTICS_SERVICE_PASSWORD"))
//                .authorizedGrantTypes("client_credentials", "refresh_token")
//                .scopes("server")
//                .and()
//                .withClient("notification-service")
//                .secret(env.getProperty("NOTIFICATION_SERVICE_PASSWORD"))
//                .authorizedGrantTypes("client_credentials", "refresh_token")
//                .scopes("server");
    }

    /**
     * Configure the {@link AuthenticationManagerBuilder} with initial
     * configuration to setup users.
     *
     * @author anilallewar
     *
     */
    @Configuration
    @Order(Ordered.LOWEST_PRECEDENCE - 20)
    protected static class AuthenticationManagerConfiguration extends
            GlobalAuthenticationConfigurerAdapter {

        @Autowired
        private DataSource dataSource;

        @Autowired
        private UserDetailsService userDetailsService;

        /**
         * Setup 2 users with different roles
         */
        @Override
        public void init(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(userDetailsService);
            // @formatter:off
//            auth.jdbcAuthentication().dataSource(dataSource).withUser("dave")
//                    .password("secret").roles("USER");
//            auth.jdbcAuthentication().dataSource(dataSource).withUser("anil")
//                    .password("password").roles("ADMIN");
            // @formatter:on
        }
    }
}
