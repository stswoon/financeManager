package nodomain.stswoon.financemanager.auth.users;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<UserEntity, Long> {
    List<UserEntity> findByLogin(String login);
}
