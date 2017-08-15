package nodomain.stswoon.financemanager.backend.operations;

public enum OperationType {
    PLUS(0l), MINUS(1l); //l - long

    private final Long operationTypeId;

    OperationType(Long operationTypeId) {
        this.operationTypeId = operationTypeId;
    }

    public Long getOperationTypeId() {
        return operationTypeId;
    }

    public static OperationType valueOfOperationTypeId(Long operationTypeId) {
        for (OperationType state : OperationType.values()) {
            if (state.getOperationTypeId().equals(operationTypeId)) {
                return state;
            }
        }
        return null;
    }
}
