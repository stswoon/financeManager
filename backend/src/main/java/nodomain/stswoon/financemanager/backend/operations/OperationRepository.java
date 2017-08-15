package nodomain.stswoon.financemanager.backend.operations;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

//https://hellokoding.com/jpa-many-to-many-relationship-mapping-example-with-spring-boot-maven-and-mysql/
public interface OperationRepository extends PagingAndSortingRepository<OperationEntity, Long> {
    List<OperationEntity> findByProjectId(Long projectId);
}
