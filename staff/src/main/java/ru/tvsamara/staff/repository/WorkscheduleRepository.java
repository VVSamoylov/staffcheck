package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.Workschedule;

/**
 *
 * @author venia
 */
@Repository
public interface WorkscheduleRepository extends JpaRepository<Workschedule, Long> {
       @Query("select w from Workschedule w where w.scheduleName=?1")
   Workschedule getByScheduleName(String name);
       @Query("select w from Workschedule w where w.id =?1 ")
    Workschedule getById(Long id);
}
