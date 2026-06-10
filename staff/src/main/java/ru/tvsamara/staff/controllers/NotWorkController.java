package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.NotWorking;
import ru.tvsamara.staff.service.api.NotWorkingService;
import ru.tvsamara.staff.service.impl.NotWorkingServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@RestController
@RequestMapping("notworking")
public class NotWorkController {
    private final NotWorkingService notWorkingService;
    private LoggerApp LOGGER;
    @Autowired
    public NotWorkController(NotWorkingServiceImpl notWorkingServ, LoggerApp loggerApp){
        this.notWorkingService = notWorkingServ;
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(NotWorkController.class);
    }
    @GetMapping("/getall")
    public Iterable<NotWorking> getAll(){
        return notWorkingService.findAll();
    }
    @PostMapping("/save")
    public Boolean saveNotWorking(@RequestBody NotWorking nw){
        try {
            notWorkingService.save(nw);
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }

        return true;
    }
    @DeleteMapping("/deleteById")
    public @ResponseBody String deleteNotWorkinById(@RequestParam long id){
        try {
            notWorkingService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

    @GetMapping("/getById")
    public NotWorking getNotWorkingById(@RequestParam("id") Long id){
        return  notWorkingService.findById(id);
    }
}
