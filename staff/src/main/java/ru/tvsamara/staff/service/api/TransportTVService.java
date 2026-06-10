package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.TransportTVImpl;

import java.time.LocalDate;
import java.util.List;

public interface TransportTVService {
    TransportTVImpl getById(Long id);
    List<TransportTVImpl> findAllSort();
    List<TransportTVImpl> findByDateInterval(LocalDate startDate, LocalDate endDate);
    List<TransportTVImpl> findByDateIntervalAndCar(LocalDate startDate, LocalDate endDate, Long carId);
    TransportTVImpl save(TransportTVImpl transportTV);
    void deleteById(Long id);
}
