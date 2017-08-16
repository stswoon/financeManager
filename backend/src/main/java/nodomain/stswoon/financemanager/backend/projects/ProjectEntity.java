package nodomain.stswoon.financemanager.backend.projects;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;

@Entity
@Table(name="Projects")
@Data
public class ProjectEntity implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id = null;

    @Column
    private Long userId;

    @Column
    private String name;

    @Override
    public Long getId() {
        return id;
    }
}
