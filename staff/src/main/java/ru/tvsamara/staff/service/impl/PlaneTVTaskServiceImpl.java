package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.PlaneTVTaskImpl;
import ru.tvsamara.staff.repository.PlaneTVTaskRepository;
import ru.tvsamara.staff.service.api.PlaneTVTaskService;

import java.util.List;
import java.util.Optional;
@Service
public class PlaneTVTaskServiceImpl implements PlaneTVTaskService {
    private final PlaneTVTaskRepository planeTVTaskRepository;

    @Autowired
    public PlaneTVTaskServiceImpl(PlaneTVTaskRepository planeTVTaskRepository) {
        this.planeTVTaskRepository = planeTVTaskRepository;
    }

    @Override
    public PlaneTVTaskImpl getByIdPlaneTvTask(Long id) {
        return planeTVTaskRepository.getByIdPlaneTvTask(id);
    }

    @Override
    public List<PlaneTVTaskImpl> findAllTaskSort() {
        return planeTVTaskRepository.findAllTaskSort();
    }

    @Override
    public List<String> getAllTitleTask() {
        return planeTVTaskRepository.getAllTitleTask();
    }

    @Override
    public List<String> getTitleTaskShot() {
        return planeTVTaskRepository.getTitleTaskShot();
    }
    @Transactional
    @Override
    public void delete(PlaneTVTaskImpl planeTVTask) {
        planeTVTaskRepository.delete(planeTVTask);
    }

    @Transactional
    @Override
    public PlaneTVTaskImpl save(PlaneTVTaskImpl planeTVTask) {
        return planeTVTaskRepository.save(planeTVTask);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        planeTVTaskRepository.deleteById(id);
    }
}
