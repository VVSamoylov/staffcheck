package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.IssuanceTask;

import java.time.LocalDate;
import java.util.List;

public interface IssuanceTaskService {
    String convertIssuanceTaskToExel(LocalDate startDate, LocalDate endDate);
    List<IssuanceTask> findAllOrderByDateDesk(LocalDate startWindow, LocalDate endWindow);
    IssuanceTask findById(Long id);
    void save(IssuanceTask issuanceTask);
    void deleteById(Long id);
}
