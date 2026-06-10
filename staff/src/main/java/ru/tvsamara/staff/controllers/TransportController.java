package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.*;
import ru.tvsamara.staff.service.api.CarService;
import ru.tvsamara.staff.service.api.EmployeeService;
import ru.tvsamara.staff.service.api.TransportTVService;
import ru.tvsamara.staff.service.impl.CarServiceImpl;
import ru.tvsamara.staff.service.impl.TransportTVServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author venia
 */
@RestController
@RequestMapping("/transport")
public class TransportController {
    private final  EmployeeService employeeService;
    private final CarService carService;
    private final TransportTVService transportTVService;
    private LoggerApp LOGGER;

    @Autowired
    public TransportController(EmployeeService emplSevice, CarServiceImpl carServ, TransportTVServiceImpl transportServ, LoggerApp LOGGER) {
        this.employeeService = emplSevice;
        this.carService = carServ;
        this.transportTVService = transportServ;
        this.LOGGER = LOGGER;
        this.LOGGER.setLogger(TransportController.class);
    }

    @GetMapping("/getalltransport")
    public List<TransportTVImpl> getAllTransport(){
        return transportTVService.findAllSort();
    }
    @GetMapping("/getTransportById")
    public TransportTVImpl getTransportById(@RequestParam("id") Long id){
        return transportTVService.getById(id);
    }

    @GetMapping("/getCarId")
    public CarImpl getCarById(@RequestParam("id") Long id){
        return carService.findById(id);
    }


    @DeleteMapping("/deleteTransport")
    public Boolean deleteTransport(@RequestParam("id") Long id){
        try {
            transportTVService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }

        return true;
    }
    @GetMapping("/getAllCars")
    public List<CarImpl> getAllcars(){
        List<CarImpl> cars = new LinkedList<>();
        for(CarImpl c : carService.findAll()){
            cars.add(c);
        }
        return cars;
    }

    @GetMapping("/getAllOilType")
    public List<OillType> getAllOilType(){

        return List.of(OillType.AKI95, OillType.AKI92, OillType.DT);
    }
    @PostMapping("/saveCar")
    public @ResponseBody String saveCar(@RequestBody CarImpl car){
        try {
            carService.save(car);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }


    @PostMapping("/saveTransport")
    public @ResponseBody String saveTransport(@RequestBody TransportTVImpl carOrder){
        if(carOrder.getId() == null || carOrder.getId()==0){
            carOrder.setId(null);
        }
        try {
            CarImpl car = carOrder.getCar();
            if(carOrder.getEndKilometerage() != null && carOrder.getEndKilometerage() > 0){
                car.setOdometer(carOrder.getEndKilometerage());
            }else{
                car.setOdometer(carOrder.getStartKilometrage());
            }

            carService.save(car);
            transportTVService.save(carOrder);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }
    @DeleteMapping("/deleteCar")
    public @ResponseBody String deleteCar(@RequestParam long id){
        try {
            carService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

}
