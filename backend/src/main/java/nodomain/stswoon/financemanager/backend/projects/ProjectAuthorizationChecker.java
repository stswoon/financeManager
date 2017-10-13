package nodomain.stswoon.financemanager.backend.projects;

import nodomain.stswoon.financemanager.backend.authorization.AuthorizationChecker;
import nodomain.stswoon.financemanager.backend.authorization.AuthorizationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectAuthorizationChecker implements AuthorizationChecker {
    final private ProjectRepository projectRepository;

    @Autowired
    public ProjectAuthorizationChecker(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public boolean check(Long projectId, Long userId) {
            ProjectEntity projectEntity = projectRepository.findOne(projectId);
            return userId.equals(projectEntity.getUserId());
    }

    @Override
    public AuthorizationManager.EntityType getEntityType() {
        return AuthorizationManager.EntityType.PROJECT;
    }
}
