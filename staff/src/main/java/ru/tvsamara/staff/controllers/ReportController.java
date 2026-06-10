package ru.tvsamara.staff.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.tvsamara.staff.DTO.CarsReport;
import ru.tvsamara.staff.DTO.EmployeeReportSkud;
import ru.tvsamara.staff.entity.TransportTVImpl;
import ru.tvsamara.staff.entity.loadXML.Event;
import ru.tvsamara.staff.service.api.SkudReportService;
import ru.tvsamara.staff.service.reports.cars.CarsReportsService;
import ru.tvsamara.staff.service.reports.skud.SkudReportServiceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/report")
public class ReportController {
    private final SkudReportService skdservice;
    private final CarsReportsService carsReportsService;
    @Autowired
    public ReportController(SkudReportServiceImpl s, CarsReportsService c){
        this.skdservice = s;
        this.carsReportsService = c;
    }
    @GetMapping("/getSkudReport")
    public List<EmployeeReportSkud> getAll(@RequestParam(value = "depId", required = true) Long depName,
                                           @RequestParam(value = "shedulerId", required = true) Long schedule,
                                           @RequestParam(value = "dateFrom", required = true)LocalDate dateFrom,
                                           @RequestParam(value = "dateTo", required = true) LocalDate dateTo){
        List<EmployeeReportSkud> res = skdservice.getItemSkud(depName, schedule, dateFrom, dateTo);

        return res;
    }

    /**
     * Получить список опоздавших сотрудников
     * @param depId
     * @param terminatorTime
     * @return
     */
    @GetMapping("/getSkudReportLatecomersByEmployees")
    public List<Event> getLatecomersByEmployee(@RequestParam(value = "depId", required = false) Long depId, @RequestParam(value = "terminatorDateTime", required = true) LocalDateTime terminatorTime){
        return skdservice.getLatecomersByEmployees(depId, terminatorTime);
    }

    @RequestMapping("/getTravelLog")
    public List<TransportTVImpl> getTravelLog(@RequestParam(value = "dateStart", required = true) LocalDate dateStart, @RequestParam(value = "dateEnd", required = true) LocalDate dateEnd){
        return  carsReportsService.getTravelLog(dateStart, dateEnd);
    }
    @RequestMapping("/getVedomostGarage")
    public List<CarsReport> getVedomostGarage(@RequestParam(value = "dateStart", required = true) LocalDate dateStart, @RequestParam(value = "dateEnd", required = true) LocalDate dateEnd){
        return  carsReportsService.getCarsReportByInterval(dateStart, dateEnd);
    }

    @RequestMapping("/getDriverCard")
    public List<TransportTVImpl> getDriverCard(@RequestParam(value = "dateStart", required = true) LocalDate dateStart, @RequestParam(value = "dateEnd", required = true) LocalDate dateEnd, @RequestParam(value = "carId", required = true) Long carId){
        return  carsReportsService.getCarsReportByIntervalAndCarId(dateStart, dateEnd, carId );
    }
}
