package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.Workschedule;

public interface WorkscheduleService {
    Workschedule getByScheduleName(String name);
    Workschedule getById(Long id);
    Workschedule save(Workschedule workschedule);
    void deleteById(Long id);
    Iterable<Workschedule> findAll();
    Workschedule findById(Long id);
}
