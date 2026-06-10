package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.repository.WorkscheduleRepository;
import ru.tvsamara.staff.service.api.WorkscheduleService;
@Service
public class WorkscheduleServiceImpl implements WorkscheduleService {
    private final WorkscheduleRepository workscheduleRepository;

    @Autowired
    public WorkscheduleServiceImpl(WorkscheduleRepository workscheduleRepository) {
        this.workscheduleRepository = workscheduleRepository;
    }

    @Override
    public Workschedule getByScheduleName(String name) {
        try{
            return workscheduleRepository.getByScheduleName(name);
        }catch (InvalidDataAccessResourceUsageException e){
            return null;
        }

    }

    @Override
    public Workschedule getById(Long id) {
        return workscheduleRepository.getById(id);
    }

    @Transactional
    @Override
    public Workschedule save(Workschedule workschedule) {
        Workschedule workscheduleFromDb = workscheduleRepository.getByScheduleName(workschedule.getScheduleName());
        if (workscheduleFromDb != null){
            return workscheduleFromDb;
        }
        return workscheduleRepository.save(workschedule);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        workscheduleRepository.deleteById(id);
    }

    @Transactional
    @Override
    public Iterable<Workschedule> findAll() {
        return workscheduleRepository.findAll();
    }

    @Override
    public Workschedule findById(Long id) {
        return workscheduleRepository.getById(id);
    }
}
