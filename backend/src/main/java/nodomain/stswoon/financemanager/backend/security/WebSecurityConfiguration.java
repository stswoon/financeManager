package nodomain.stswoon.financemanager.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by jjmendoza on 14/7/2017.
 */
@Configuration
@EnableOAuth2Sso
//@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

//    @Value("${auth-server}/logout")
//    private String logoutUrl;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http
                //.logout()
                //.logoutSuccessUrl(logoutUrl)
                //.and()
//                .authorizeRequests().anyRequest().authenticated();
                .authorizeRequests().anyRequest().hasRole("USER");
    }
}
