package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.loadXML.Event;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DownloadSKUD {
    String downloadSkud(Long depId, Long shedulerId, LocalDate dateFrom, LocalDate dateTo);
    List<Event> getSkudEventEmployeeById(Long employeeId, LocalDate dateFrom, LocalDate dateTo);
    Boolean setSkudEventEmployee(Event event);
    Boolean deleteSkudEventById(Long id);
    String getSkudReportLatecomersByEmployees(Long deptId, LocalDateTime terminateTime);
}
