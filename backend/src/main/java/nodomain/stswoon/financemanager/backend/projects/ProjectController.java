package nodomain.stswoon.financemanager.backend.projects;

import nodomain.stswoon.financemanager.backend.authorization.Authorization;
import nodomain.stswoon.financemanager.backend.authorization.AuthorizationManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

//https://stackoverflow.com/questions/28228068/spring-boot-full-rest-crud-example
@RestController
public class ProjectController {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Authorization(entityType = AuthorizationManager.EntityType.USER)
    @RequestMapping(value = "/project/{userId}", method = GET)
    public List<ProjectDto> getList(@PathVariable long userId) {
        List<ProjectEntity> entities = projectRepository.findByUserId(userId);
        List<ProjectDto> dtos = new ArrayList<>();
        entities.forEach(projectEntity -> dtos.add(new ProjectDto(projectEntity.getId(), projectEntity.getName())));
        return dtos;
    }

    @Authorization(entityType = AuthorizationManager.EntityType.USER)
    @RequestMapping(value = "/project/{userId}", method = PUT)
    public ProjectDto create(@PathVariable long userId, @RequestBody ProjectDto projectDto) {
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setName(projectDto.getName());
        projectEntity.setUserId(userId);
        projectRepository.save(projectEntity);

        projectEntity = projectRepository.findByName(projectDto.getName()).get(0);
        return new ProjectDto(projectEntity.getId(), projectEntity.getName());
    }

    @Authorization(entityType = AuthorizationManager.EntityType.PROJECT)
    @RequestMapping(value = "/project/{id}", method = DELETE)
    public void remove(@PathVariable long id) {
        projectRepository.delete(id);
    }

    @Authorization(entityType = AuthorizationManager.EntityType.PROJECT)
    @RequestMapping(value = "/project/{id}", method = POST)
    public void update(@PathVariable long id, @RequestBody ProjectDto projectDto) {
        ProjectEntity projectEntity = projectRepository.findOne(id);
        projectEntity.setName(projectDto.getName());
        projectRepository.save(projectEntity);
    }

}
