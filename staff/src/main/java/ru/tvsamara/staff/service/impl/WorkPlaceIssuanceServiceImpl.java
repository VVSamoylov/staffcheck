package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.WorkplaceIssuance;
import ru.tvsamara.staff.repository.WorkPlaceIssuanceRepository;
import ru.tvsamara.staff.service.api.WorkPlaceIssuanceService;
@Service
public class WorkPlaceIssuanceServiceImpl implements WorkPlaceIssuanceService {
    private final WorkPlaceIssuanceRepository workPlaceIssuanceRepository;
    @Autowired
    public WorkPlaceIssuanceServiceImpl(WorkPlaceIssuanceRepository workPlaceIssuanceRepo) {
        this.workPlaceIssuanceRepository = workPlaceIssuanceRepo;
    }

    @Override
    public Iterable<WorkplaceIssuance> findAll() {
        return workPlaceIssuanceRepository.findAll();
    }

    @Override
    public WorkplaceIssuance findById(Long id) {
        return workPlaceIssuanceRepository.findById(id).get();
    }

    @Transactional
    @Override
    public WorkplaceIssuance save(WorkplaceIssuance workplaceIssuance) {
        return workPlaceIssuanceRepository.save(workplaceIssuance);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        workPlaceIssuanceRepository.deleteById(id);
    }
}
