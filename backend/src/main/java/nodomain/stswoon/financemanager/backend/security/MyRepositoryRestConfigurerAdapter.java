package nodomain.stswoon.financemanager.backend.security;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

public class MyRepositoryRestConfigurerAdapter extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        Cors.setCorsFilter(config.getCorsRegistry());
    }
}
