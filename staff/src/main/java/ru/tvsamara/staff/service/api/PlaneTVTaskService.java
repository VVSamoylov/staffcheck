package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.PlaneTVTaskImpl;

import java.util.List;
import java.util.Optional;

public interface PlaneTVTaskService {
    PlaneTVTaskImpl getByIdPlaneTvTask(Long id);
    List<PlaneTVTaskImpl> findAllTaskSort();
    List<String> getAllTitleTask();
    List<String> getTitleTaskShot();
    void delete(PlaneTVTaskImpl planeTVTask);
    PlaneTVTaskImpl save(PlaneTVTaskImpl planeTVTask);
    void deleteById(Long id);
}
