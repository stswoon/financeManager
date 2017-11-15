package nodomain.stswoon.financemanager.backend.statistics;

import nodomain.stswoon.financemanager.backend.authorization.Authorization;
import nodomain.stswoon.financemanager.backend.authorization.AuthorizationManager;
import nodomain.stswoon.financemanager.backend.operations.OperationEntity;
import nodomain.stswoon.financemanager.backend.operations.OperationRepository;
import nodomain.stswoon.financemanager.backend.operations.OperationType;
import nodomain.stswoon.financemanager.backend.projects.ProjectDto;
import nodomain.stswoon.financemanager.backend.projects.ProjectEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class StatisticsController {
    private final OperationRepository operationRepository;

    @Autowired
    public StatisticsController(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    @Authorization(entityType = AuthorizationManager.EntityType.USER)
    @RequestMapping(value = "/statistics/{projectId}", method = GET)
    public StatisticsDto getList(@PathVariable long projectId) {
        List<OperationEntity> entities = operationRepository.findByProjectId(projectId);

        List<String> categories = Arrays.asList("Income", "Costs");
        List<Double> data =  Arrays.asList(0.0, 0.0);
        entities.forEach(entity -> {
            if (OperationType.valueOfOperationTypeId(entity.getOperationTypeId()) == OperationType.MINUS) {
                data.set(0, data.get(0) + entity.getValue());
            } else {
                data.set(1, data.get(1) + entity.getValue());
            }
        });
        return new StatisticsDto(categories, data);
    }
}