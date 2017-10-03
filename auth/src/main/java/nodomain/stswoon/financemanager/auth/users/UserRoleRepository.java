package nodomain.stswoon.financemanager.auth.users;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRoleRepository extends CrudRepository<UserRoleEntity, Long> {
    List<UserRoleEntity> findByLogin(String login);
}
