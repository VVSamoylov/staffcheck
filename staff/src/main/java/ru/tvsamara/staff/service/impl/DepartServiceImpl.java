package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.repository.DepartRepository;
import ru.tvsamara.staff.service.api.DepartService;
@Service
public class DepartServiceImpl implements DepartService {
    private final DepartRepository departRepository;

    @Autowired
    public DepartServiceImpl(DepartRepository departRepository) {
        this.departRepository = departRepository;
    }

    @Override
    public DepartamentImpl getByDepName(String name) {
        try{
            return departRepository.getByDepName(name);
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public DepartamentImpl getByDepId(Long id) {
        return departRepository.getByDepId(id);
    }

    @Override
    public Iterable<DepartamentImpl> findAll() {
        return departRepository.findAll();
    }
    @Transactional
    @Override
    public DepartamentImpl save(DepartamentImpl departament) {
        DepartamentImpl departBd = departRepository.getByDepName(departament.getDepName());
        if(departBd!=null){
            return departBd;
        }
        return departRepository.save(departament);
    }

    @Override
    public void deleteById(Long id) {
        departRepository.deleteById(id);
    }
}
