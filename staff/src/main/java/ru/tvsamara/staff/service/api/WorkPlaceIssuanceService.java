package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.WorkplaceIssuance;

public interface WorkPlaceIssuanceService {
    Iterable<WorkplaceIssuance> findAll();
    WorkplaceIssuance findById(Long id);
    WorkplaceIssuance save(WorkplaceIssuance workplaceIssuance);
    void deleteById(Long id);
}
