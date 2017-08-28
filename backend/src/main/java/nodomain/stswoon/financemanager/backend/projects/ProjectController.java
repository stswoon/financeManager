package nodomain.stswoon.financemanager.backend.projects;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.*;

//https://stackoverflow.com/questions/28228068/spring-boot-full-rest-crud-example
@RestController
public class ProjectController {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @RequestMapping(value = "/project/{userId}", method = GET)
    public List<ProjectDto> getList(@PathVariable long userId) {
        List<ProjectEntity> entities = projectRepository.findByUserId(userId);
        List<ProjectDto> dtos = entities.stream()
                .map(projectEntity -> new ProjectDto(projectEntity.getId(), projectEntity.getName()))
                .collect(Collectors.toList());
        return dtos;
    }

    @RequestMapping(value = "/project/{userId}", method = PUT)
    public ProjectDto create(@PathVariable long userId, @RequestBody ProjectDto projectDto) {
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setName(projectDto.getName());
        projectEntity.setUserId(userId);
        projectRepository.save(projectEntity);

        projectEntity = projectRepository.findByName(projectDto.getName()).get(0);
        return new ProjectDto(projectEntity.getId(), projectEntity.getName());
    }

    @RequestMapping(value = "/project/{id}", method = DELETE)
    public void remove(@PathVariable long id) {
        projectRepository.delete(id);
    }

    @RequestMapping(value = "/project/{id}", method = POST)
    public void update(@PathVariable long id, @RequestBody ProjectDto projectDto) {
        ProjectEntity projectEntity = projectRepository.findOne(id);
        projectEntity.setName(projectDto.getName());
        projectRepository.save(projectEntity);
    }

}
