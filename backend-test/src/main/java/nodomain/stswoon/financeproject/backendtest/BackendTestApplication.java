package nodomain.stswoon.financeproject.backendtest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@EnableDiscoveryClient
@SpringBootApplication
//@ComponentScan(basePackageClasses = HelloWorldController.class)
public class BackendTestApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendTestApplication.class, args);
	}
}
