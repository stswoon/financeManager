package nodomain.stswoon.financemanager.backend.security;

import org.springframework.data.rest.core.config.RepositoryCorsRegistry;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistration;

public class CorsRepositoryRestConfigurerAdapter extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        setCorsFilter(config.getCorsRegistry());
    }

    public void setCorsFilter(RepositoryCorsRegistry corsRegistry) {
        CorsRegistration config = corsRegistry.addMapping("/**");
        config.allowCredentials(true);
        config.allowedOrigins("*");
        config.allowedHeaders("*");
        config.allowedMethods("*");
    }
}
