package ru.tvsamara.staff.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import ru.tvsamara.staff.entity.IntervalWorkDay;
import ru.tvsamara.staff.entity.loadXML.Event;
import ru.tvsamara.staff.service.api.DownloadSKUD;
import ru.tvsamara.staff.service.api.IntervalWorkDayService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/utils")
@RestController
public class UtilController {
    private final IntervalWorkDayService intervalWorkDayService;
    private final DownloadSKUD loadSkud;
    @Autowired
    public UtilController(IntervalWorkDayService intervalWorkDay, DownloadSKUD loadSkud) {
        this.intervalWorkDayService = intervalWorkDay;
        this.loadSkud=loadSkud;
    }

    @GetMapping("/getlimit")
    public IntervalWorkDay getLimit() {
        return intervalWorkDayService.getIntervalWorkDay();
    }
    @GetMapping("/skud/getByEmployee")
    public @ResponseBody List<Event> getEventSkudEmployee(@RequestParam("employeeId") Long employeeId, @RequestParam("dateFrom") LocalDate dateFrom, @RequestParam("dateTo") LocalDate dateTo) {
        return loadSkud.getSkudEventEmployeeById(employeeId, dateFrom, dateTo);
    }
    @PostMapping("/skud/setEmployee")
    public Boolean setSkudEventAllEmployee(@AuthenticationPrincipal Jwt jwt, @RequestBody Event event) {
        if (jwt != null) {
            event.setEditorName(jwt.getClaim("name").toString());
            event.setEditorDateTime(LocalDateTime.now());
        }
        return loadSkud.setSkudEventEmployee(event);
    }
    @PostMapping("/setWorkInterval")
    public void setWorkInterval(@RequestBody IntervalWorkDay intervalWorkDay) {
        intervalWorkDayService.setIntervalWorkDay(intervalWorkDay);
    }
    @DeleteMapping("/skud/deleteEventById")
    public @ResponseBody String deleteEventById(@RequestParam("id") Long id){
        loadSkud.deleteSkudEventById(id);
        return "ok";
    }

}
