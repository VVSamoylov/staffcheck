package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.CarImpl;
import ru.tvsamara.staff.repository.CarRepository;
import ru.tvsamara.staff.service.api.CarService;

import java.util.List;
@Service
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;

    @Autowired
    public CarServiceImpl(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public List<CarImpl> getByModel(String name) {
        return carRepository.getByModel(name);
    }

    @Override
    public CarImpl getById(Long id) {
        return carRepository.getById(id);
    }

    @Transactional
    @Override
    public CarImpl save(CarImpl car) {
        return carRepository.save(car);
    }

    @Override
    public CarImpl findById(Long id) {
        return carRepository.getById(id);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public Iterable<CarImpl> findAll() {
        return carRepository.findAll();
    }
}
