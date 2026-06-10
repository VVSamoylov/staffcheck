package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.API.Departament;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.entity.loadXML.Event;
import ru.tvsamara.staff.repository.LoadSKUDRepo;
import ru.tvsamara.staff.service.api.LoadSKUDService;
import ru.tvsamara.staff.service.logging.LoggerApp;


import java.time.LocalDateTime;
import java.util.List;
@Service
public class LoadSKUDServiceImpl implements LoadSKUDService {
    private LoggerApp LOGGER;
    private final LoadSKUDRepo loadSKUDRepo;
    @Autowired
    public LoadSKUDServiceImpl(LoadSKUDRepo loadSKUDRepo, LoggerApp LOGGER) {
        this.loadSKUDRepo = loadSKUDRepo;
        this.LOGGER = LOGGER;
        this.LOGGER.setLogger(LoadSKUDServiceImpl.class);
    }

    @Override
    public List<Event> getReport(Departament department, Workschedule sheduler, LocalDateTime dateFrom, LocalDateTime dateTo) {
        return loadSKUDRepo.getReport(department, sheduler, dateFrom, dateTo);
    }

    @Override
    public List<Event> getListEmployeeBetweenDate(Long employee, LocalDateTime dateFrom, LocalDateTime dateTo) {
        return loadSKUDRepo.getListEmployeeBetweenDate(employee, dateFrom, dateTo);
    }

    @Override
    public List<Event> getLatecomersByEmployees(Long deptId, LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo) {
        return loadSKUDRepo.getLatecomersByEmployees(deptId, dateTimeFrom, dateTimeTo);
    }

    @Override
    public List<Event> getLatecomersByEmployees(LocalDateTime dateTimeFrom, LocalDateTime dateTimeTo) {
        return loadSKUDRepo.getLatecomersByEmployees(dateTimeFrom, dateTimeTo);
    }


    @Override
    public void saveAll(Iterable<Event> events) {
        for(Event event: events){
            try{
                loadSKUDRepo.save(event);
            }catch (DataIntegrityViolationException e){
                LOGGER.error("Ошибка при сохранении события " +
                    event.getEmployee().getLastName_F_M() + " " +
                    event.getDateTime() + " " +
                    event.getMessage(), e);
            }
        }

    }
    @Transactional
    @Override
    public Event save(Event event) {
        return loadSKUDRepo.save(event);
    }
    @Transactional
    @Override
    public void deleteById(Long id) {
        loadSKUDRepo.deleteById(id);
    }
}
