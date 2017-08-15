package nodomain.stswoon.financemanager.backend.operations;

import lombok.Data;

import java.util.Date;

@Data
public class OperationDto {
    private final Long id;
    private final String comment;
    private final OperationType operationType;
    private final Integer value;
    private final Date date;
}
