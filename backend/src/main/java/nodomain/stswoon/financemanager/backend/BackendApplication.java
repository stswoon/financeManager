package nodomain.stswoon.financemanager.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;

//@EnableOAuth2Resource
//@EnableResourceServer //https://spring.io/blog/2015/11/30/migrating-oauth2-apps-from-spring-boot-1-2-to-1-3

@Configuration
@SpringBootApplication
@Slf4j
public class BackendApplication /*extends ResourceServerConfigurerAdapter*/ {
    private static SpringApplication springApplication;

    public static void main(String[] args) {
        springApplication = new SpringApplication(BackendApplication.class);
        springApplication.run(args);
    }

    @Bean
    OAuth2RestTemplate oAuth2RestTemplate(OAuth2ClientContext clientContext, OAuth2ProtectedResourceDetails details){
        return new OAuth2RestTemplate(details, clientContext);
    }

}
