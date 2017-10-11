package nodomain.stswoon.financemanager.backend.authorization;

import nodomain.stswoon.financemanager.backend.projects.ProjectEntity;
import nodomain.stswoon.financemanager.backend.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationManager { //todo rename auth module to authentification
    public enum EntityType {PROJECT, OPERATION, USER}

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    OAuth2RestTemplate restTemplate;

    @Value("${auth-server}")
    String authUrl;

    //todo not null
    public boolean hasAccess(EntityType entityType, Long id) { //todo spring post bean
        //todo guard code
        if (entityType == EntityType.PROJECT) { //todo stategy
            ProjectEntity projectEntity = projectRepository.findOne(id);
            Long userId = projectEntity.getUserId();

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String login = (String) auth.getPrincipal();
            User user = restTemplate.getForObject(authUrl + "/user/" + login, User.class);
            Long realUserId = user.getId();

            //return realUserId.equals(userId); //avoid autoboxing
            if (!realUserId.equals(userId)) {
                throw new RuntimeException("unaothrize"); //todo 403
            }
        }

        return true;
    }
}

class User {
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
