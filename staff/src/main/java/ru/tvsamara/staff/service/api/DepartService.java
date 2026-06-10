package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.DepartamentImpl;

public interface DepartService {
    DepartamentImpl getByDepName(String name);
    DepartamentImpl getByDepId(Long id);
    Iterable<DepartamentImpl> findAll();
    DepartamentImpl save(DepartamentImpl departament);
    void deleteById(Long id);
}
