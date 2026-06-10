package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.API.Departament;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.entity.loadXML.Event;

import java.time.LocalDateTime;
import java.util.List;

public interface LoadSKUDService {
    List<Event> getReport(Departament department, Workschedule sheduler, LocalDateTime dateFrom, LocalDateTime dateTo);
    List<Event> getListEmployeeBetweenDate(Long employee, LocalDateTime dateFrom, LocalDateTime dateTo);
    List<Event> getLatecomersByEmployees(Long deptId, LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo);
    List<Event> getLatecomersByEmployees(LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo);
    void saveAll(Iterable<Event> events);
    Event save(Event event);
    void deleteById(Long id);
}
