package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.entity.NotWorking;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.repository.NotWorkingRepository;
import ru.tvsamara.staff.service.api.NotWorkingService;

import java.time.LocalDate;
import java.util.List;
@Service
public class NotWorkingServiceImpl implements NotWorkingService {
    private final NotWorkingRepository notWorkingRepository;

    @Autowired
    public NotWorkingServiceImpl(NotWorkingRepository notWorkingRepository) {
        this.notWorkingRepository = notWorkingRepository;
    }

    @Override
    public List<NotWorking> findByInterval(LocalDate beginDate, LocalDate endDate, DepartamentImpl dept, Workschedule shedulerId) {
        return notWorkingRepository.findByInterval(beginDate, endDate, dept, shedulerId);
    }

    @Transactional
    @Override
    public NotWorking save(NotWorking notWorking) {
        return notWorkingRepository.save(notWorking);
    }

    @Override
    public Iterable<NotWorking> findAll() {
        return notWorkingRepository.findAll();
    }
    @Transactional
    @Override
    public void deleteById(Long id) {
    notWorkingRepository.deleteById(id);
    }

    @Override
    public NotWorking findById(Long id) {
        return notWorkingRepository.findById(id).get();
    }
}
