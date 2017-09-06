package nodomain.stswoon.financemanager.auth.users;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
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

    @Override
    public Long getId() {
        return id;
    }
}
