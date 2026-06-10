package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.CarImpl;

import java.util.List;

public interface CarService {
    List<CarImpl> getByModel(String name);
    CarImpl getById(Long id);
    CarImpl save(CarImpl car);
    CarImpl findById(Long id);
    void deleteById(Long id);
    Iterable<CarImpl> findAll();
}
