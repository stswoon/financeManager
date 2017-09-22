package nodomain.stswoon.financemanager.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

/**
 * Created by jjmendoza on 14/7/2017.
 */
@Configuration
@EnableOAuth2Sso
//@EnableWebSecurity
@EnableResourceServer
public class WebSecurityConfiguration extends ResourceServerConfigurerAdapter { //https://stackoverflow.com/questions/44977972/how-to-enable-bearer-authentication-on-spring-boot-application

//    @Value("${auth-server}/logout")
//    private String logoutUrl;

    @Override
    public void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable();
        http
                //.logout()
                //.logoutSuccessUrl(logoutUrl)
                //.and()
                .authorizeRequests().anyRequest().authenticated().and().csrf().disable();
                //.antMatchers("/**").access("#oauth2.hasScope('read')")
                //.and().csrf().ignoringAntMatchers("/**");
//                .authorizeRequests().anyRequest().hasRole("USER");
    }
}
