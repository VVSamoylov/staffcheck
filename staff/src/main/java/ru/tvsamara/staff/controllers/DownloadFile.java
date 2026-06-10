package ru.tvsamara.staff.controllers;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import ru.tvsamara.staff.API.Employee;
import ru.tvsamara.staff.entity.*;
import ru.tvsamara.staff.service.api.*;
import ru.tvsamara.staff.service.fileService.DownlodFileToDB;
import ru.tvsamara.staff.service.fileService.FileStorageService;
import ru.tvsamara.staff.service.impl.*;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@Controller
public class DownloadFile {
    private final FileStorageService fileservice;
    private final DownlodFileToDB fileInExel;
    private final DepartService departService;
    private final PositionService positionService;
    private final EmployeeService employeeService;
    private final WorkscheduleService workscheduleService;
    private final NotWorkingService notWorkingService;
    private LoggerApp LOGGER;
    private final DownloadPlaneTv downloadPlaneTv;
    private final WorkPlaneTVService workPlaneTVService;
    private final DownloadSKUD downloadSKUD;
    private final IssuanceTaskService issuanceTaskService;
    @Autowired
    public DownloadFile(FileStorageService fileStorageService, DownlodFileToDB downlodFileToDB, PositionServiceImpl positionServ,
                        EmployeeService employeeService, DepartServiceImpl departamentService, WorkscheduleServiceImpl workscheduleServ,
                        NotWorkingServiceImpl notWorkingServ, LoggerApp loggerApp, DownloadPlaneTv downloadPlaneTv,
                        WorkPlaneTVServiceImpl workPlaneTVServ, DownloadSKUD downloadSKUD, IssuanceTaskService issuanceTaskService){
        this.fileservice = fileStorageService;
        this.fileInExel = downlodFileToDB;
        this.positionService = positionServ;
        this.employeeService = employeeService;
        this.departService = departamentService;
        this.workscheduleService = workscheduleServ;
        this.notWorkingService = notWorkingServ;
        this.LOGGER = loggerApp;
        this.downloadPlaneTv = downloadPlaneTv;
        this.workPlaneTVService = workPlaneTVServ;
        this.downloadSKUD = downloadSKUD;
        this.issuanceTaskService = issuanceTaskService;
        this.LOGGER.setLogger(DownloadFile.class);
    }

    @PostMapping(value = "/upload/uploadempl", headers = ("content-type=multipart/*"),  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity downloadEmployee(@RequestParam("file") MultipartFile file){
        fileservice.storeFile(file);
        LOGGER.info("временный файл для загрузки сотрудников в базу " + file.getOriginalFilename());
        List<Employee> employees = fileInExel.DownlodFileEmployeeToDB(file);
        fileservice.deleteFile(file);
        Set<String> depataments = new HashSet<>();
        Set<String> position = new HashSet<>();
        Set<String> sheduler = new HashSet<>();
        //создаем набор уникальных значений отделов и должностей
        for(Employee empl : employees){
            depataments.add(empl.getDept());
            position.add(empl.getJob());
            sheduler.add(empl.getWorkShedule());
        }
        //Сохраняем отделы в базу
        for(String dept : depataments){
            DepartamentImpl dpt = new DepartamentImpl();
            dpt.setDepName(dept);
            departService.save(dpt);
        }
        // Сохраняем должности в базу
        for(String pos : position){
            Position posItem = new Position();
            posItem.setPosName(pos);
            positionService.save(posItem);
        }
        // Сохраняем графики
        for(String shed : sheduler){
            Workschedule shedule = new Workschedule();
            shedule.setScheduleName(shed);
            workscheduleService.save(shedule);
        }

        // Получаем сохраненных сотрудников в базе
        List<EmployeeImpl> emplsDb = employeeService.getAllActiveEmployee();
        for(EmployeeImpl empl : emplsDb){
            if(!employees.contains(empl) && empl.getActive() != null && empl.getActive()){
                //Увольняем сотрудника
                empl.setActive(false);
                employeeService.save(empl);
            }else{
                empl.setActive(true);
            }
        }
        // Сохраняем сотрудников в базу
        for(Employee emp : employees){
            EmployeeImpl empItem = new EmployeeImpl();
            empItem.setFirstName(emp.getFirstName());
            empItem.setMiddleName(emp.getMiddleName());
            empItem.setLastName(emp.getLastName());
            empItem.setSnils(emp.getSnils());
            Workschedule wsh = workscheduleService.getByScheduleName(emp.getWorkShedule());
            empItem.setSchedule(wsh);
            DepartamentImpl  dpt = departService.getByDepName(emp.getDept());
            empItem.setDept(dpt);
            Position pos = positionService.getByPosName(emp.getJob());
            empItem.setPosition(pos);
            empItem.setActive(true);
            employeeService.save(empItem);

        }


        return ResponseEntity.ok().build();
    }


    @PostMapping(value = "/upload/uploadnotworking", headers = ("content-type=multipart/*"),  consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity downloadNotWorking(@RequestParam("file") MultipartFile file){
        fileservice.storeFile(file);
        LOGGER.info("временный файл для загрузки неявок  в базу " + file.getOriginalFilename());
        List<NotWorking> notWprkings = fileInExel.DownlodFileNotWorkToDB(file);
        fileservice.deleteFile(file);
        //создаем набор уникальных значений отделов и должностей

        // Сохраняем в базе неявки
        for(NotWorking ntw : notWprkings){
            notWorkingService.save(ntw);
        }



        return ResponseEntity.ok().build();
    }

    @GetMapping("/download/tvplan/{id}")
    public ResponseEntity downloadTVPlan(@PathVariable("id") Long id) throws Exception {

        String filename = downloadPlaneTv.downloadPlaneTv(id);
        Path path = Paths.get(filename);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM) // тип контента
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"") // предложение скачать
            .body(resource);
    }

    @GetMapping("/download/skud")
    public ResponseEntity downloadSkud(@RequestParam("depId") Long depId, @RequestParam("shedulerId") Long shedulerId,
                                       @RequestParam("dateFrom")LocalDate dateFrom, @RequestParam("dateTo") LocalDate dateTo) throws Exception {

        String filename = downloadSKUD.downloadSkud(depId, shedulerId, dateFrom, dateTo);
        Path path = Paths.get(filename);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM) // тип контента
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"") // предложение скачать
            .body(resource);
    }
    @GetMapping("/download/skud/getSkudReportLatecomersByEmployees")
    public ResponseEntity getSkudReportLatecomersByEmployees(@RequestParam(value = "depId", required = false) Long depId, @RequestParam(value = "terminatorDateTime", required = true) LocalDateTime terminatorTime) throws Exception {

        String filename = downloadSKUD.getSkudReportLatecomersByEmployees(depId, terminatorTime);
        Path path = Paths.get(filename);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM) // тип контента
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"") // предложение скачать
            .body(resource);
    }
    @GetMapping("/download/releasePlan")
    public ResponseEntity downloadReleasePlan(@RequestParam("start") LocalDate start,@RequestParam("end") LocalDate end) throws Exception {

        String filename = issuanceTaskService.convertIssuanceTaskToExel(start, end);
        Path path = Paths.get(filename);
        Resource resource = new UrlResource(path.toUri());
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM) // тип контента
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"") // предложение скачать
            .body(resource);
    }
}
