package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.service.api.DepartService;
import ru.tvsamara.staff.service.api.EmployeeService;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@RestController
@RequestMapping("/depart")
public class DepartController {
    private final DepartService departService;
    private final EmployeeService employeeService;
    private  LoggerApp LOGGER;
    @Autowired
    public DepartController(DepartService departamentServ, EmployeeService employeeRepository, LoggerApp loggerApp ){
        this.departService = departamentServ;
        this.employeeService = employeeRepository;
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(DepartController.class);
    }
    @GetMapping("/getall")
    public Iterable<DepartamentImpl> getAll(){
        Iterable<DepartamentImpl> departs = departService.findAll();
        return departs;
    }
    @GetMapping("/getbyname")
    public DepartamentImpl getByName(@RequestParam("deptname") String deptName){
        DepartamentImpl depart = departService.getByDepName(deptName);
        return depart;
    }
    @GetMapping("/getById")
    public DepartamentImpl getById(@RequestParam("id") Long id){
        return departService.getByDepId(id);
    }

    @PostMapping(value = "/save")
    public @ResponseBody Boolean saveDept(@RequestBody DepartamentImpl depart){

        if(depart.getBoss() != null) {
            EmployeeImpl boss = employeeService.getEmployeeById(depart.getBoss().getId());
            depart.setBoss(boss);
        }
        try {
            departService.save(depart);
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
        return true;
    }

    @DeleteMapping("/deleById")
    public @ResponseBody Boolean deleteById(@RequestParam("id") Long id){
        try {
            departService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return false;
        }
        return true;
    }
}
