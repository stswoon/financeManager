package nodomain.stswoon.financemanager.backend.operations;

import nodomain.stswoon.financemanager.backend.authorization.AuthorizationChecker;
import nodomain.stswoon.financemanager.backend.authorization.AuthorizationManager;
import nodomain.stswoon.financemanager.backend.projects.ProjectEntity;
import nodomain.stswoon.financemanager.backend.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OperationAuthorizationChecker implements AuthorizationChecker {
    final private ProjectRepository projectRepository;
    final private OperationRepository operationRepository;

    @Autowired
    public OperationAuthorizationChecker(ProjectRepository projectRepository, OperationRepository operationRepository) {
        this.projectRepository = projectRepository;
        this.operationRepository = operationRepository;
    }

    @Override
    public boolean check(Long operationId, Long userId) {
            OperationEntity operationEntity = operationRepository.findOne(operationId);
            ProjectEntity projectEntity = projectRepository.findOne(operationEntity.getProjectId()); //maybe use AuthorizationManager
            return userId.equals(projectEntity.getUserId());
    }

    @Override
    public AuthorizationManager.EntityType getEntityType() {
        return AuthorizationManager.EntityType.OPERATION;
    }
}
