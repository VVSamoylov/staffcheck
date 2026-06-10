package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.DTO.WorkPlaneTVDTO;
import ru.tvsamara.staff.entity.*;
import ru.tvsamara.staff.service.api.*;
import ru.tvsamara.staff.service.impl.*;
import ru.tvsamara.staff.service.logging.LoggerApp;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/planeTV")
public class PlaneTVTaslController {
    private final WorkPlaneTVService workPlaneTVService;
    private final EmployeeService employeeService;
    private final PlaneTVTaskService planerepo;
    private final CarService carService;
    private final TransportTVService transportTVService;
    private LoggerApp LOGGER;
    private ConverterWorkPlateAndWorkPaleDTO serviceDTO;

    @Autowired
    public PlaneTVTaslController(WorkPlaneTVServiceImpl wkService, EmployeeServiceImpl emplService, PlaneTVTaskServiceImpl planeServ,
                                 CarServiceImpl carserv, TransportTVServiceImpl transportTVServ, LoggerApp LOGGER, ConverterWorkPlateAndWorkPaleDTO serviceDTO) {
        this.workPlaneTVService = wkService;
        this.employeeService = emplService;
        this.planerepo = planeServ;
        this.carService = carserv;
        this.transportTVService = transportTVServ;
        this.LOGGER = LOGGER;
        this.LOGGER.setLogger(PlaneTVTaslController.class);
        this.serviceDTO = serviceDTO;
    }

    @RequestMapping("/getAll")
    public ResponseEntity<List<WorkPlaneTVImpl>> getAll(){
        return ResponseEntity.ok(workPlaneTVService.findAllWorkPolaneTVSort());
    }
    @RequestMapping("/getAllBetweenDate")
    public ResponseEntity<List<WorkPlaneTVImpl>> getAllBetweenDate(@RequestParam(name = "startDate", required = false) LocalDate startDate, @RequestParam(name = "endDate", required = false) LocalDate endDate){
        if(startDate == null || endDate == null){
            return ResponseEntity.ok(workPlaneTVService.findAllWorkPolaneTVSort());
        }
        return ResponseEntity.ok(workPlaneTVService.findAllWorkPolaneTVSortBetweeDate(startDate, endDate));
    }
    @RequestMapping("/getAllTask")
    public ResponseEntity<List<PlaneTVTaskImpl>> getAllTask(){
        return ResponseEntity.ok(planerepo.findAllTaskSort());
    }
    @DeleteMapping("/deleteTask")
    public String deleteaskById(@RequestParam long id){
        PlaneTVTaskImpl pl=    planerepo.getByIdPlaneTvTask(id);
        planerepo.delete(pl);
        return  "ok";
    }
    @RequestMapping("/getById")
    public ResponseEntity<WorkPlaneTVDTO> getById(@RequestParam Long id){
        //WorkPlaneTVImpl wk = wkrepo.findById(id).orElse(null);
        WorkPlaneTVDTO wk = serviceDTO.getWorkPlaneById(id);
        return ResponseEntity.ok(wk);
    }
    @RequestMapping("/getPlaneByDate")
    public @ResponseBody Boolean getPlaneByDate(@RequestParam LocalDate date){
        Integer res = workPlaneTVService.findWorkPolaneTVByDate(date);
        return res ==0;
    }
    @RequestMapping("/getAllSheff")
    public ResponseEntity<List<EmployeeImpl>> getAllSheff(){
        List<EmployeeImpl> shefs = employeeService.getEmployeeAllSheff();
        return ResponseEntity.ok(shefs);
    }

    @RequestMapping("/getDutyTV")
    public ResponseEntity<List<EmployeeImpl>> getDutyTV(){
        List<EmployeeImpl> shefs = employeeService.getEmployeeAllTVProducer();
        return ResponseEntity.ok(shefs);
    }
    @RequestMapping("/getDutySait")
    public ResponseEntity<List<EmployeeImpl>> getDutySait(){
        List<EmployeeImpl> shefs = employeeService.getEmployeeAllDutySait();
        return ResponseEntity.ok(shefs);
    }

    @RequestMapping("/getSait9_18")
    public ResponseEntity<List<EmployeeImpl>> getSait9_18(){
        List<EmployeeImpl> shefs = employeeService.getEmployeeAllSait9_18();
        return ResponseEntity.ok(shefs);
    }

    @GetMapping("/findAllTaskType")
    public Iterable<TaskType> findAllTaskType(){
        return  List.of(TaskType.PR, TaskType.TZ, TaskType.RED, TaskType.ALL);
    }
    @GetMapping("/findAllTaskStatus")
    public Iterable<TaskProgress> findAllTaskStatus(){
        return  List.of(TaskProgress.SHOT, TaskProgress.DEVELOP, TaskProgress.DELAY, TaskProgress.CANCELLED);
    }

    @DeleteMapping("/deleplan")
    public String deletePlanByID(@RequestParam Long id){
        try {
            workPlaneTVService.deleteById(id);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

    @PostMapping("/add")
    public @ResponseBody String addPlane(@RequestBody WorkPlaneTVDTO planeDto){
        try{
            WorkPlaneTVImpl plane = serviceDTO.convertToEntity(planeDto);
            plane.setId(null);
            if(plane != null) {
                if(plane.getMorningTVChef() != null) {
                    plane.setMorningTVChef(employeeService.getEmployeeById(plane.getMorningTVChef().getId()));
                }
                if(plane.getDaytimeTVChef() != null) {
                    plane.setDaytimeTVChef(employeeService.getEmployeeById(plane.getDaytimeTVChef().getId()));
                }
                if(plane.getDutyTV() != null) {
                    plane.setDutyTV(employeeService.getEmployeeById((plane.getDutyTV().getId())));
                }
                if(plane.getChiefSite() != null) {
                    plane.setChiefSite(employeeService.getEmployeeById((plane.getChiefSite().getId())));
                }
                Set<EmployeeImpl> dutySite = new HashSet<>();
                if(plane.getDutySite() != null && !plane.getDutySite().isEmpty()) {
                    for (EmployeeImpl em : plane.getDutySite()) {
                        dutySite.add(employeeService.getEmployeeById(em.getId()));
                    }
                }
                Set<EmployeeImpl> daySaites = new HashSet<>();
                if(plane.getDaySaites() != null && !plane.getDaySaites().isEmpty()) {
                    for (EmployeeImpl em : plane.getDaySaites()) {
                        daySaites.add(employeeService.getEmployeeById(em.getId()));
                    }
                }
                plane.setDutySite(dutySite);
                plane.setDaySaites(daySaites);
            }

            workPlaneTVService.save(plane);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }
    @GetMapping("/getAllProject")
    public List<String> getAllProject(){
        return planerepo.getAllTitleTask();
    }
    @GetMapping("/getShotProject")
    public List<String> getShotProject(){
        //Устанавливаем окно выдачи результата за квартал
        LocalDate startWindow  = LocalDate.now().minusMonths(3);
        LocalDate endWindow  = LocalDate.now().plusDays(2);
        List<WorkPlaneTVImpl> a = workPlaneTVService.getShotProject(startWindow, endWindow);
        return   a.stream().map(wp ->wp.getPlaneTasks())
            .flatMap(p -> p.stream()).filter(p -> p.getProgress().equals(TaskProgress.SHOT)).map(p1 -> p1.getTitle()).distinct().toList();
    }
    @PostMapping("/updateTask")
    public @ResponseBody String updateTask(@RequestBody PlaneTVTaskImpl task){
        try {
            planerepo.save(task);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }
    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String savePlane(@RequestBody WorkPlaneTVDTO planeDto){
        WorkPlaneTVImpl plane = serviceDTO.convertToEntity(planeDto);
        if(plane.getId() == null || plane.getId() == 0){
            return "error";
        }
        try {
            if(plane != null) {
                if (plane.getMorningTVChef() != null) {
                    plane.setMorningTVChef(employeeService.getEmployeeById(plane.getMorningTVChef().getId()));
                }
                if (plane.getDaytimeTVChef() != null) {
                    plane.setDaytimeTVChef(employeeService.getEmployeeById(plane.getDaytimeTVChef().getId()));
                }
                if (plane.getDutyTV() != null) {
                    plane.setDutyTV(employeeService.getEmployeeById((plane.getDutyTV().getId())));
                }
                if (plane.getChiefSite() != null) {
                    plane.setChiefSite(employeeService.getEmployeeById((plane.getChiefSite().getId())));
                }
                Set<EmployeeImpl> dutySite = new HashSet<>();
                if (plane.getDutySite() != null && !plane.getDutySite().isEmpty()) {
                    for (EmployeeImpl em : plane.getDutySite()) {
                        dutySite.add(employeeService.getEmployeeById(em.getId()));
                    }
                    plane.setDutySite(dutySite);
                }
                Set<EmployeeImpl> daySaites = new HashSet<>();
                if (plane.getDaySaites() != null && !plane.getDaySaites().isEmpty()) {
                    for (EmployeeImpl em : plane.getDaySaites()) {
                        daySaites.add(employeeService.getEmployeeById(em.getId()));
                    }
                    plane.setDaySaites(daySaites);
                }
                //plane.setDaySaites(daySaites);
                Set<EmployeeImpl> dutySocial = new HashSet<>();
                if (plane.getDutySocial() != null && !plane.getDutySocial().isEmpty()) {
                    for (EmployeeImpl em : plane.getDutySocial()) {
                        dutySocial.add(employeeService.getEmployeeById(em.getId()));
                    }
                    plane.setDutySocial(dutySocial);
                }

                List<PlaneTVTaskImpl> tasks = new LinkedList<>();

                for (PlaneTVTaskImpl t : plane.getPlaneTasks()) {
                    PlaneTVTaskImpl curTask = null;
                    if (t.getId() != null) {
                        curTask = planerepo.getByIdPlaneTvTask(t.getId());
                    } else if (t.getId() == null || curTask == null) {
                        curTask = new PlaneTVTaskImpl();
                    }
                    curTask.setType(t.getType());
                    curTask.setProgress(t.getProgress());
                    curTask.setTitle(t.getTitle());
                    curTask.setShootingLocation(t.getShootingLocation());
                    curTask.setStartTime(t.getStartTime());
                    curTask.setEndTime(t.getEndTime());
                    List<EmployeeImpl> corespondents = new LinkedList<>();
                    if (t.getCorespondent() != null) {
                        for (EmployeeImpl e : t.getCorespondent()) {
                            corespondents.add(employeeService.getEmployeeById(e.getId()));
                        }
                    }
                    curTask.setCorespondent(corespondents);
                    List<EmployeeImpl> operators = new LinkedList<>();
                    if (t.getOperator() != null) {
                        for (EmployeeImpl e : t.getOperator()) {
                            operators.add(employeeService.getEmployeeById(e.getId()));
                        }
                    }
                    curTask.setOperator(operators);
                    if (t.getManager() != null) {
                        curTask.setManager(employeeService.getEmployeeById(t.getManager().getId()));
                    }
                    if (t.getDescription() != null) {
                        curTask.setDescription(t.getDescription());
                    }
                    if (t.getStartLocation() != null) {
                        curTask.setStartLocation(transportTVService.getById(t.getStartLocation().getId()));
                    }
                    if (t.getExitLocation() != null) {
                        curTask.setExitLocation(transportTVService.getById(t.getExitLocation().getId()));
                    }
                    curTask = planerepo.save(curTask);
                    tasks.add(curTask);
                }
                plane.setPlaneTasks(tasks);
            }
            workPlaneTVService.save(plane);
        }catch (Exception e){
            LOGGER.error(e);
            return "error";
        }
        return "ok";
    }

    @GetMapping("/getExel")
    public String getExel(@PathVariable("id") Long id){
        System.out.println(id);
        return "ok";
    }

}
