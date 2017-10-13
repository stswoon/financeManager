package nodomain.stswoon.financemanager.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Value("${auth-server}")
    private String authUrl;

    final private OAuth2RestTemplate restTemplate;

    @Autowired
    public UserService(OAuth2RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String login = (String) auth.getPrincipal();
        UserDto userDto = restTemplate.getForObject(authUrl + "/user/" + login, UserDto.class);
        return userDto;
    }

    private static class UserDto implements User {
        String login;
        Long Id;

        public String getLogin() {
            return login;
        }

        public void setLogin(String login) {
            this.login = login;
        }

        public Long getId() {
            return Id;
        }

        public void setId(Long id) {
            Id = id;
        }
    }

    public interface User {
        String getLogin();

        Long getId();
    }
}
