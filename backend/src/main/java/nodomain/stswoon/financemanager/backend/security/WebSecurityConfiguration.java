package nodomain.stswoon.financemanager.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableOAuth2Sso
@EnableResourceServer
//@Profile(value = {"cloud", "local"})
public class WebSecurityConfiguration extends ResourceServerConfigurerAdapter { //https://stackoverflow.com/questions/44977972/how-to-enable-bearer-authentication-on-spring-boot-application
    @Value("${disableOAuth2}")
    private boolean disableOAuth2;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        if (disableOAuth2) {
            http.authorizeRequests().antMatchers("/**").permitAll().and().csrf().disable();
            return;
        }
        http.authorizeRequests().anyRequest().authenticated().and().csrf().disable();
    }
}
