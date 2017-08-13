package nodomain.stswoon.financeproject.backendtest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class HelloWorldTestController {
    @Autowired
    @LoadBalanced
    private RestTemplate restTemplate;

    @RequestMapping("/gethello")
    public String hello() {
        return restTemplate.getForObject("http://BACK-SERVICE" + "/hello", String.class);
    }
}
