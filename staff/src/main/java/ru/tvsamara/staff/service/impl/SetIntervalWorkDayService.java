package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.IntervalWorkDay;
import ru.tvsamara.staff.repository.IntervalWorkDayRepository;
import ru.tvsamara.staff.service.api.IntervalWorkDayService;

@Service
public class SetIntervalWorkDayService implements IntervalWorkDayService {
    private final IntervalWorkDayRepository intervalWorkDayRepository;

    @Autowired
    public SetIntervalWorkDayService(IntervalWorkDayRepository intervalWorkDayRepository) {
        this.intervalWorkDayRepository = intervalWorkDayRepository;
    }
    @Transactional
    @Override
    public void setIntervalWorkDay(IntervalWorkDay wd) {
        intervalWorkDayRepository.modifaed(wd.getDutySait(), wd.getDutySocial());
    }

    @Transactional
    @Override
    public IntervalWorkDay getIntervalWorkDay() {
        return intervalWorkDayRepository.findById(1L).orElse(null);
    }
}
