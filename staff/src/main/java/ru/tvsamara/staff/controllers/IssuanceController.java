package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.IssuanceTask;
import ru.tvsamara.staff.entity.WorkplaceIssuance;
import ru.tvsamara.staff.service.api.IssuanceTaskService;
import ru.tvsamara.staff.service.api.WorkPlaceIssuanceService;
import ru.tvsamara.staff.service.impl.IssuanceTaskServiceImpl;
import ru.tvsamara.staff.service.impl.WorkPlaceIssuanceServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/issuance")
/**
 * контроллер для выпуска матерала в эфир
 */
public class IssuanceController {
    private final IssuanceTaskService issuanceTaskService;
    private final WorkPlaceIssuanceService workPlaceIssuanceService;
    private LoggerApp LOGGER;

    @Autowired
    public IssuanceController(IssuanceTaskServiceImpl issuanceTaskServ,
                              WorkPlaceIssuanceServiceImpl workPlaceIssuanceServ, LoggerApp loggerApp){
        this.issuanceTaskService = issuanceTaskServ;
        this.workPlaceIssuanceService = workPlaceIssuanceServ;
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(IssuanceController.class);
    }

    @GetMapping("/findAllTasks")
    public List<IssuanceTask> findAllTasks(){
        //Устанавливаем окно выдачи результата за 2 месяц
          LocalDate  startWindow  = LocalDate.now().minusMonths(1);
          LocalDate  endWindow  = LocalDate.now().plusMonths(1);
        return issuanceTaskService.findAllOrderByDateDesk(startWindow, endWindow);
    }
    @GetMapping("/findAllTasksBetweenByDate")
    public List<IssuanceTask> findTasksBetweenDate(@RequestParam("start") LocalDate start, @RequestParam("end") LocalDate end){
        return issuanceTaskService.findAllOrderByDateDesk(start, end);
    }
    @GetMapping("/findTasksById")
    public IssuanceTask findTasksById(@RequestParam("id") Long id){
        return issuanceTaskService.findById(id);
    }
    @GetMapping("/findAllWorkPlaces")
    public Iterable<WorkplaceIssuance> findAllWorkPlaces(){
        return workPlaceIssuanceService.findAll();
    }
    @GetMapping("/findWorkPlacesById")
    public WorkplaceIssuance findWorkPlacesById(@RequestParam("id") Long id){
        return workPlaceIssuanceService.findById(id);
    }
    @PostMapping("/saveWorkPlace")
    public @ResponseBody Boolean saveWorkPlace(@RequestBody WorkplaceIssuance workplaceIssuance){
        try {
            workPlaceIssuanceService.save(workplaceIssuance);
            return true;
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
    }
    @PostMapping("/saveTask")
    public @ResponseBody Boolean saveTask(@RequestBody IssuanceTask issuanceTask){
        try{
            issuanceTaskService.save(issuanceTask);
            return true;
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
    }
    @DeleteMapping("/deleteTaskById")
    public @ResponseBody String deleteTask(@RequestParam long id){
        try {
            issuanceTaskService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }
    @DeleteMapping("/deleteWorkPlaceById")
    public @ResponseBody String deleteWorkPlace(@RequestParam long id){
        try {
            workPlaceIssuanceService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

}
