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
    @Column(unique = true, nullable = false)
    @GeneratedValue
    private Long id;

    @Column
    private Long userId;

    @Column
    private String name;
}
