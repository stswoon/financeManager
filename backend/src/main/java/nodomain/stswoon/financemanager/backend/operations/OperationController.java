package nodomain.stswoon.financemanager.backend.operations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class OperationController {
    private final OperationRepository operationRepository;

    @Autowired
    public OperationController(OperationRepository operationRepository) {
        this.operationRepository = operationRepository;
    }

    @RequestMapping(value = "/operation/{projectId}", method = GET)
    public List<OperationDto> getList(@PathVariable long projectId) {
        List<OperationEntity> entities = operationRepository.findByProjectId(projectId);
        List<OperationDto> dtos = entities.stream()
                .map(operationEntity -> {
                    return new OperationDto(
                            operationEntity.getId(),
                            operationEntity.getComment(),
                            OperationType.valueOfOperationTypeId(operationEntity.getOperationTypeId()), //https://gigsterous.github.io/engineering/2016/09/25/spring-boot-2.html
                            operationEntity.getValue(),
                            operationEntity.getDate()
                    );
                })
                .collect(Collectors.toList());
        return dtos;
    }

    @RequestMapping(value = "/operation/{projectId}", method = PUT)
    public void create(@PathVariable Long projectId, @RequestBody OperationDto operationDto) {
        OperationEntity operationEntity = new OperationEntity();
        operationEntity.setComment(operationDto.getComment());
        operationEntity.setDate(operationDto.getDate());
        operationEntity.setOperationTypeId(operationDto.getOperationType().getOperationTypeId());
        operationEntity.setValue(operationDto.getValue());
        operationEntity.setProjectId(projectId);
        operationRepository.save(operationEntity);
    }

    @RequestMapping(value = "/operation/{id}", method = DELETE)
    public void remove(@PathVariable long id) {
        operationRepository.delete(id);
    }

    @RequestMapping(value = "/operation/{id}", method = POST)
    public void update(@PathVariable long id, @RequestBody OperationDto operationDto) {
        OperationEntity operationEntity = operationRepository.findOne(id);
        operationEntity.setComment(operationDto.getComment());
        operationEntity.setDate(operationDto.getDate());
        operationEntity.setOperationTypeId(operationDto.getOperationType().getOperationTypeId());
        operationEntity.setValue(operationDto.getValue());
        operationRepository.save(operationEntity);
    }
}