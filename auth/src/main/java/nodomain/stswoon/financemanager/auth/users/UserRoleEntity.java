package nodomain.stswoon.financemanager.auth.users;

import lombok.Data;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "UserRoles")
public class UserRoleEntity implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id = null;

    @Column
    private String login;

    @Column
    private String role;

    public UserRoleEntity() {
    }

    public UserRoleEntity(String login, String role) {
        this.login = login;
        this.role = role;
    }
}
