package nodomain.stswoon.financemanager.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.sql.DataSource;

//https://github.com/spring-guides/tut-spring-security-and-angular-js.git
//https://github.com/sqshq/PiggyMetrics.git
//https://github.com/rohitghatol/spring-boot-microservices.git
//https://github.com/juanzero000/spring-boot-oauth2-sso.git
//https://github.com/Baeldung/spring-security-oauth.git
@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Autowired
    DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //todo check captcha
        http
                .csrf().disable() //todo enable
                .formLogin().permitAll()
                .and()
                .logout().logoutUrl("/logout").permitAll()
                .and()
                .requestMatchers()
                .antMatchers(
                        "/", "/login", "/oauth/**", "/exit",
                        "/oauth/authorize",
                        "/oauth/confirm_access",
                        "/oauth/token",
                        "/oauth/check_token"
                )
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/user").permitAll() //registration
                .antMatchers("/webjars/**").permitAll()
                .anyRequest().authenticated();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
        //todo db token
        //https://docs.spring.io/spring-security/oauth/apidocs/org/springframework/security/oauth2/provider/token/TokenStore.html
        //https://github.com/adorsys/oauth/tree/master/oauth-tokenstore-jpa/src/main/java/de/adorsys/oauth/tokenstore/jpa
        //https://stackoverflow.com/questions/30617554/spring-security-oauth2-purge-tokenstore
        //https://stackoverflow.com/questions/36904178/how-to-persist-oauth-access-tokens-in-spring-security-jdbc
        //https://stackoverflow.com/questions/20958166/what-are-the-steps-to-implement-springs-token-store-as-a-mysql-file
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("SELECT login AS username, password, enabled FROM users WHERE login=?")
                .authoritiesByUsernameQuery("SELECT login AS username, role FROM user_roles WHERE login=?");
    }

}
