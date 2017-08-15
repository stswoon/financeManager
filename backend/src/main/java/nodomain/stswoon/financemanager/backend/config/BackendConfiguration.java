package nodomain.stswoon.financemanager.backend.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@EnableAutoConfiguration
@EnableDiscoveryClient
@Profile({"cloud"})
public class BackendConfiguration {
}
