package nodomain.stswoon.financemanager.backend.projects;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {
    List<ProjectEntity> findByUserId(Long userId);
    List<ProjectEntity> findByName(String name);
}
