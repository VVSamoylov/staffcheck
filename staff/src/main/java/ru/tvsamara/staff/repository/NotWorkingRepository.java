package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.entity.NotWorking;
import ru.tvsamara.staff.entity.Workschedule;
import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author venia
 */
public interface NotWorkingRepository  extends JpaRepository<NotWorking, Long> {
    @Query("select n from NotWorking n where (n.beginDate BETWEEN ?1 and ?2) and  n.employee.dept = ?3 and n.employee.schedule = ?4  order by  n.beginDate, n.employee")
    public List<NotWorking> findByInterval(LocalDate beginDate, LocalDate endDate, DepartamentImpl dept, Workschedule shedulerId);

}
