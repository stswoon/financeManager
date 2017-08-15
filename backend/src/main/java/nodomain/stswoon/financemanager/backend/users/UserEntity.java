package nodomain.stswoon.financemanager.backend.users;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Entity
@Table(name="Users")
public class UserEntity implements Identifiable<Long> {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Long id = null;

    @Column
    @Getter
    @Setter
    private String name;

    @Column
    @Getter
    @Setter
    private String password;

    @Override
    public Long getId() {
        return id;
    }
}
