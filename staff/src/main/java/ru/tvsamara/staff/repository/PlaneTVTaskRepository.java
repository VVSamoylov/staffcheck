package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.tvsamara.staff.entity.PlaneTVTaskImpl;
import java.util.List;

public interface PlaneTVTaskRepository extends JpaRepository<PlaneTVTaskImpl, Long> {
    @Query("select w from PlaneTVTaskImpl w where w.id=?1")
    PlaneTVTaskImpl getByIdPlaneTvTask(Long id);
    @Query("select w from PlaneTVTaskImpl w order by w.startTime desc")
    List<PlaneTVTaskImpl> findAllTaskSort();
    @Query("select DISTINCT p.title from PlaneTVTaskImpl p ")
    List<String> getAllTitleTask();

    @Query("select DISTINCT p.title from PlaneTVTaskImpl p where p.progress = 'SHOT' ")
    List<String> getTitleTaskShot();
}

