package nodomain.stswoon.financemanager.backend.security;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableOAuth2Sso
//@EnableWebSecurity
@EnableResourceServer
public class WebSecurityConfiguration extends ResourceServerConfigurerAdapter { //https://stackoverflow.com/questions/44977972/how-to-enable-bearer-authentication-on-spring-boot-application
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().authenticated().and().csrf().disable();
    }
}
