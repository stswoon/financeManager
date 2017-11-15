package nodomain.stswoon.financemanager.backend.statistics;

import lombok.Data;

import java.util.List;

@Data
public class StatisticsDto {
    private final List<String> categories;
    private final List<Double> data;
}
