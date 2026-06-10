package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.WorkPlaneTVImpl;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkPlaneTVRepository extends JpaRepository<WorkPlaneTVImpl, Long> {
    @Query("select w from WorkPlaneTVImpl w where w.id=?1")
    Optional<WorkPlaneTVImpl> getByIdWorkPlaneTv(Long id);
    @Query("select w from WorkPlaneTVImpl w order by w.planeDate desc")
    List<WorkPlaneTVImpl> findAllWorkPolaneTVSort();
    @Query("select w from WorkPlaneTVImpl w where w.planeDate BETWEEN :startWindow AND :endWindow order by w.planeDate desc")
    List<WorkPlaneTVImpl> findAllWorkPolaneTVSortBetweeDate(LocalDate startWindow, LocalDate endWindow);
    @Query("select count(w) from WorkPlaneTVImpl w where  w.planeDate = :date")
    Integer findWorkPolaneTVByDate(@Param("date") LocalDate date);
    @Query("select w from WorkPlaneTVImpl w where w.planeDate BETWEEN :startWindow AND :endWindow")
    List<WorkPlaneTVImpl> getShotProject(LocalDate startWindow, LocalDate endWindow);
    //поиск ограничения на переработку согласно итервалу дат
    @Query(value="select count(ld.employee_id)    from workplanetv w inner join list_duty ld  on w.id = ld.planetv_id   where w.plane_date between :startDate and :endDate and ld.employee_id = :staffid", nativeQuery=true)
    Integer findWorkDutySaitAlarm(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("staffid") Long staffid);

    //поиск ограничения на переработку согласно итервалу дат
    @Query(value="select count(lds.employee_id)    from workplanetv w inner join list_dutysocial lds  on w.id = lds.planetv_id   where w.plane_date between :startDate and :endDate and lds.employee_id = :staffid", nativeQuery=true)
    Integer findWorkDutySocialAlarm(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate, @Param("staffid") Long staffid);

}
