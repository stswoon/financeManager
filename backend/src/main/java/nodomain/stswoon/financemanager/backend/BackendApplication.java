package nodomain.stswoon.financemanager.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;

@EnableAspectJAutoProxy
@Configuration
@SpringBootApplication
@Slf4j
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    OAuth2RestTemplate oAuth2RestTemplate(OAuth2ClientContext clientContext, OAuth2ProtectedResourceDetails details){
        return new OAuth2RestTemplate(details, clientContext);
    }
}
