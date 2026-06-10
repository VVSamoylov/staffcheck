package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.API.Departament;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.entity.loadXML.Event;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoadSKUDRepo extends JpaRepository<Event, Long> {
    @Query("select e from Event e where e.employee.dept = ?1 and e.employee.schedule = ?2 and e.dateTime BETWEEN ?3 and ?4 order by e.employee, e.dateTime")
    List<Event> getReport(Departament department, Workschedule sheduler, LocalDateTime dateFrom, LocalDateTime dateTo);
    @Query("select e from Event e where e.employee.id = :employee and e.dateTime BETWEEN :dateFrom and :dateTo order by  e.dateTime")
    List<Event> getListEmployeeBetweenDate(Long employee, LocalDateTime dateFrom, LocalDateTime dateTo);
    @Query("select e from Event e where e.employee.dept.id = :deptId and e.message LIKE '%Штатный вход%' and e.dateTime  BETWEEN :dateTimeFrom and :dateTimeTo  order by e.employee")
    List<Event> getLatecomersByEmployees(Long deptId, LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo);
    @Query("select e from Event e where  e.message LIKE '%Штатный вход%' and e.dateTime  BETWEEN :dateTimeFrom and :dateTimeTo  order by e.employee")
    List<Event> getLatecomersByEmployees(LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo);
}

