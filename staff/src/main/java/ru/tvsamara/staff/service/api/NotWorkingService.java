package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.entity.NotWorking;
import ru.tvsamara.staff.entity.Workschedule;

import java.time.LocalDate;
import java.util.List;

public interface NotWorkingService {
    List<NotWorking> findByInterval(LocalDate beginDate, LocalDate endDate, DepartamentImpl dept, Workschedule shedulerId);
    NotWorking save(NotWorking notWorking);
    Iterable<NotWorking> findAll();
    void deleteById(Long id);
    NotWorking findById(Long id);
}
