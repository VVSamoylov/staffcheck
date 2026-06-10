package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.DTO.EmployeeReportSkud;
import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.entity.loadXML.Event;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

public interface SkudReportService {
    List<EmployeeReportSkud> getItemSkud(Long depId, Long shedulerId, LocalDate dateFrom, LocalDate dateTo);
    List<Event> getLatecomersByEmployees(Long depId, LocalDateTime terminatorTime);
}
