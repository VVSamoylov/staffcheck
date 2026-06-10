package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.TransportTVImpl;
import ru.tvsamara.staff.repository.TransportTVRepository;
import ru.tvsamara.staff.service.api.TransportTVService;

import java.time.LocalDate;
import java.util.List;
@Service
public class TransportTVServiceImpl implements TransportTVService {
    private final TransportTVRepository transportTVRepository;

    @Autowired
    public TransportTVServiceImpl(TransportTVRepository transportTVRepository) {
        this.transportTVRepository = transportTVRepository;
    }

    @Override
    public TransportTVImpl getById(Long id) {
        return transportTVRepository.getById(id);
    }

    @Override
    public List<TransportTVImpl> findAllSort() {
        return transportTVRepository.findAllSort();
    }

    @Override
    public List<TransportTVImpl> findByDateInterval(LocalDate startDate, LocalDate endDate) {
        return transportTVRepository.findByDateInterval(startDate, endDate);
    }

    @Override
    public List<TransportTVImpl> findByDateIntervalAndCar(LocalDate startDate, LocalDate endDate, Long carId) {
        return transportTVRepository.findByDateIntervalAndCar(startDate, endDate, carId);
    }

    @Transactional
    @Override
    public TransportTVImpl save(TransportTVImpl transportTV) {
        return transportTVRepository.save(transportTV);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        transportTVRepository.deleteById(id);
    }
}
