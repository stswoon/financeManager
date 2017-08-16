package nodomain.stswoon.financemanager.backend.health;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @RequestMapping("/health/{login}")
    public String hello(@PathVariable("name") String name) {
        return "Hello, " + name + "!";
    }
}
