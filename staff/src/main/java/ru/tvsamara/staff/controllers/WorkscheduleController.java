package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.Workschedule;
import ru.tvsamara.staff.service.api.WorkscheduleService;
import ru.tvsamara.staff.service.impl.WorkscheduleServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@RestController
@RequestMapping("/workschedule")
public class WorkscheduleController {
    private final WorkscheduleService workscheduleService;
    private LoggerApp LOGGER;
    @Autowired
    public WorkscheduleController(WorkscheduleServiceImpl workschedServ, LoggerApp LOGGER) {
        this.workscheduleService = workschedServ;
        this.LOGGER = LOGGER;
        this.LOGGER.setLogger(WorkscheduleController.class);
    }

    @GetMapping("/getall")
    public Iterable<Workschedule> getAll(){
        return workscheduleService.findAll();
    }

    @GetMapping("/getById")
    public Workschedule getById(@RequestParam("id") Long id){
        return workscheduleService.findById(id);
    }
    @PostMapping("/saveWorkschedule")
    public Boolean saveWorkschedule(@RequestBody Workschedule workschedule){
        try {
            workscheduleService.save(workschedule);
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
        return true;
    }
    @DeleteMapping("/deleteById")
    public @ResponseBody String deleteNotWorlScheduleById(@RequestParam long id){
        try {
            workscheduleService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

}
