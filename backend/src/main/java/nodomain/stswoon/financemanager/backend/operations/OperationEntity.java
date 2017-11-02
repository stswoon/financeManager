package nodomain.stswoon.financemanager.backend.operations;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.Identifiable;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Operations")
@Data
public class OperationEntity implements Identifiable<Long> {
    @Id
    @GeneratedValue
    private Long id = null;

    @Column
    private Long projectId; //https://gigsterous.github.io/engineering/2016/09/25/spring-boot-2.html

    @Column
    private Long operationTypeId;

    @Column
    private Integer value;

    @Column
    private String comment;

    @Column
    private Date date;

    @Override
    public Long getId() {
        return id;
    }

    public OperationEntity() {
    }

    public OperationEntity(Long projectId, Long operationTypeId, Integer value, String comment, Date date) {
        this.projectId = projectId;
        this.operationTypeId = operationTypeId;
        this.value = value;
        this.comment = comment;
        this.date = date;
    }
}
