package nodomain.stswoon.financemanager.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by jjmendoza on 14/7/2017.
 */
@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter{
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin().permitAll()
                .and()
                .logout().permitAll()
                .and()
                .requestMatchers()
                .antMatchers("/", "/login", "/oauth/authorize", "/oauth/confirm_access", "/exit")
                .and()
                .authorizeRequests()
                .antMatchers("/webjars/**").permitAll()
                .anyRequest().authenticated();
                //.authorizeRequests()
                //.anyRequest().authenticated();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("john").password("123").roles("USER");
    }

}
