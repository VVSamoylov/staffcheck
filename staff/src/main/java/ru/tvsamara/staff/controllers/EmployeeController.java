package ru.tvsamara.staff.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.*;
import ru.tvsamara.staff.service.api.DepartService;
import ru.tvsamara.staff.service.api.EmployeeService;
import ru.tvsamara.staff.service.api.PositionService;
import ru.tvsamara.staff.service.api.WorkscheduleService;
import ru.tvsamara.staff.service.impl.DepartServiceImpl;
import ru.tvsamara.staff.service.impl.EmployeeServiceImpl;
import ru.tvsamara.staff.service.impl.PositionServiceImpl;
import ru.tvsamara.staff.service.impl.WorkscheduleServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final PositionService positionService;
    private final WorkscheduleService workscheduleService;
    private final DepartService departService;
    private  LoggerApp LOGGER;

    @Autowired
    public EmployeeController(EmployeeServiceImpl employeeService, PositionServiceImpl positionServ,
                              WorkscheduleServiceImpl workscheduleServ, DepartServiceImpl departamentService, LoggerApp loggerApp){
        this.employeeService = employeeService;
        this.positionService = positionServ;
        this.workscheduleService = workscheduleServ;
        this.departService = departamentService;
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(EmployeeController.class);
    }

    @GetMapping("/getallemployee")
    public List<EmployeeImpl> getAllEmployee(@AuthenticationPrincipal Jwt jwt){
        System.out.println(jwt.getClaim("preferred_username").toString());
        List<EmployeeImpl> employees = employeeService.getAllActiveEmployee();
        return employees;
    }
    @GetMapping("/getallEmpl")
    public Iterable<EmployeeImpl> getAllEmpl(){
        return employeeService.findAll();
    }

    @GetMapping("/getEmployeebyid")
    public EmployeeImpl getEmployeeById(@RequestParam("id") Long id){
        return employeeService.getEmployeeById(id);
    }
    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody EmployeeImpl save(@RequestBody EmployeeImpl employee) {
        EmployeeImpl em;
        try {
           em =  employeeService.save(employee);
        }catch (Exception e){
            LOGGER.error(e);
            return null;
        }
        System.out.println(em);
        return em;
    }

    @DeleteMapping("/deleteById")
    public @ResponseBody String deleteEmployeeById(@RequestParam("id") Long id){
        try {
            EmployeeImpl employee = employeeService.getEmployeeById(id);
            employee.setActive(false);
            employeeService.save(employee);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

    @GetMapping("/findAllCorrespondent")
    public Iterable<EmployeeImpl> findAllCorrespondent(){
        return employeeService.findAllCorrespondents();
    }
    @GetMapping("/findAllOperator")
    public Iterable<EmployeeImpl> findAllOperator(){
        return  employeeService.findAllOperators();
    }

    @GetMapping("/findAllManager")
    public Iterable<EmployeeImpl> findAllManager(){
        return employeeService.findAllManagers();
    }
    @GetMapping("/findAllDriver")
    public Iterable<EmployeeImpl> findAllDriver(){
        return employeeService.getEmployeeDrivers();
    }
    @GetMapping("/findDispatcher")
    public EmployeeImpl findDispatcher(){
        return employeeService.getEmployeeDispatcher();
    }
    @GetMapping("/findMekhanic")
    public EmployeeImpl findMekhanic(){
        return employeeService.getEmployeeMekhanic();
    }
    @GetMapping("/allBoss")
    public List<EmployeeImpl> findAllBoss(){
        return employeeService.findAllBoss();
    }
    @GetMapping("/allByDept")
    public List<EmployeeImpl> findAllByDept(@RequestParam("deptId")Long deptId){
        return employeeService.findAllByDepartment(deptId);
    }
}
