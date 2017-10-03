package nodomain.stswoon.financemanager.auth.users;

import lombok.Data;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Users")
public class UserEntity implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id = null;

    @Column
    private String login;

    @Column
    private String password;

    @Column
    private int enabled = 1;

    public UserEntity() {
    }

    public UserEntity(String login, String password) {
        this.login = login;
        this.password = password;
    }
}
