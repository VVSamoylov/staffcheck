package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.WorkPlaneTVImpl;
import ru.tvsamara.staff.repository.WorkPlaneTVRepository;
import ru.tvsamara.staff.service.api.WorkPlaneTVService;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Service
public class WorkPlaneTVServiceImpl implements WorkPlaneTVService {
    private final WorkPlaneTVRepository workPlaneTVRepository;
    @Autowired
    public WorkPlaneTVServiceImpl(WorkPlaneTVRepository workPlaneTVRepo) {
        this.workPlaneTVRepository = workPlaneTVRepo;
    }

    @Override
    public Optional<WorkPlaneTVImpl> getByIdWorkPlaneTv(Long id) {
        return workPlaneTVRepository.getByIdWorkPlaneTv(id);
    }

    @Override
    public List<WorkPlaneTVImpl> findAllWorkPolaneTVSort() {
        return workPlaneTVRepository.findAllWorkPolaneTVSort();
    }

    @Override
    public List<WorkPlaneTVImpl> findAllWorkPolaneTVSortBetweeDate(LocalDate startWindow, LocalDate endWindow) {
        return workPlaneTVRepository.findAllWorkPolaneTVSortBetweeDate(startWindow,endWindow);
    }

    @Override
    public Integer findWorkPolaneTVByDate(LocalDate date) {
        return workPlaneTVRepository.findWorkPolaneTVByDate(date);
    }

    @Override
    public List<WorkPlaneTVImpl> getShotProject(LocalDate startWindow, LocalDate endWindow) {
        return workPlaneTVRepository.getShotProject(startWindow,endWindow);
    }

    @Override
    public Integer findWorkDutySaitAlarm(LocalDate startDate, LocalDate endDate, Long staffid) {
        return workPlaneTVRepository.findWorkDutySaitAlarm(startDate,endDate,staffid);
    }

    @Override
    public Integer findWorkDutySocialAlarm(LocalDate startDate, LocalDate endDate, Long staffid) {
        return workPlaneTVRepository.findWorkDutySocialAlarm(startDate,endDate,staffid);
    }
    @Transactional
    @Override
    public void deleteById(Long id) {
        workPlaneTVRepository.deleteById(id);
    }
    @Transactional
    @Override
    public WorkPlaneTVImpl save(WorkPlaneTVImpl workPlaneTV) {
        return workPlaneTVRepository.save(workPlaneTV);
    }
}
