package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.WorkPlaneTVImpl;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WorkPlaneTVService {
    Optional<WorkPlaneTVImpl> getByIdWorkPlaneTv(Long id);
    List<WorkPlaneTVImpl> findAllWorkPolaneTVSort();
    List<WorkPlaneTVImpl> findAllWorkPolaneTVSortBetweeDate(LocalDate startWindow, LocalDate endWindow);
    Integer findWorkPolaneTVByDate(LocalDate date);
    List<WorkPlaneTVImpl> getShotProject(LocalDate startWindow, LocalDate endWindow);
    Integer findWorkDutySaitAlarm(LocalDate startDate, LocalDate endDate, Long staffid);
    Integer findWorkDutySocialAlarm(LocalDate startDate, LocalDate endDate, Long staffid);
    void deleteById(Long id);
    WorkPlaneTVImpl save(WorkPlaneTVImpl workPlaneTV);
}
