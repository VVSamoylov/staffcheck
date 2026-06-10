package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.Position;
import ru.tvsamara.staff.service.api.PositionService;
import ru.tvsamara.staff.service.impl.PositionServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@RestController
@RequestMapping("/position")
public class PositionController {
    private final PositionService positionService;
    private LoggerApp LOGGER;

    @Autowired
    public PositionController(PositionServiceImpl positionServ, LoggerApp LOGGER) {
        this.positionService = positionServ;
        this.LOGGER = LOGGER;
        this.LOGGER.setLogger(PositionController.class);
    }

    @GetMapping("/getall")
    public Iterable<Position> getAll(){
        return positionService.findAll();
    }
    @GetMapping("/getById")
    public Position getPositionById(@RequestParam("id") Long id){
        return  positionService.findById(id);
    }
    @PostMapping("/saveposition")
    public Boolean savePosition(@RequestBody Position position){
        try {
            positionService.save(position);
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
        return true;
    }
    @DeleteMapping("/deleteById")
    public @ResponseBody String deleteCar(@RequestParam long id){
        try {
            positionService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }
}
