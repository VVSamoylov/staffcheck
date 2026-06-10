package ru.tvsamara.staff.service.reports.skud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.tvsamara.staff.DTO.EmployeeReportSkud;
import ru.tvsamara.staff.DTO.ItemReportSkud;
import ru.tvsamara.staff.entity.*;
import ru.tvsamara.staff.entity.loadXML.Event;
import ru.tvsamara.staff.repository.WorkscheduleRepository;
import ru.tvsamara.staff.service.api.*;
import ru.tvsamara.staff.service.impl.LoadSKUDServiceImpl;
import ru.tvsamara.staff.service.impl.NotWorkingServiceImpl;
import ru.tvsamara.staff.service.impl.WorkscheduleServiceImpl;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class SkudReportServiceImpl implements SkudReportService {
    final String outMessage = "Штатный выход";
    private final LoadSKUDService  loadSKUDService;
    private final DepartService departService;
    private final WorkscheduleService wsrepo;
    private final NotWorkingService notWorkingService;
    @Autowired
    public SkudReportServiceImpl(LoadSKUDServiceImpl skdSrv, DepartService departamentService, WorkscheduleServiceImpl workscheduleServ, NotWorkingServiceImpl nw) {
        this.loadSKUDService = skdSrv;
        this.departService = departamentService;
        this.wsrepo = workscheduleServ;
        this.notWorkingService = nw;
    }
    @Override
    public List<EmployeeReportSkud> getItemSkud(Long depId, Long shedulerId, LocalDate dateFrom, LocalDate dateTo){
        DepartamentImpl dep = departService.getByDepId(depId);
        Workschedule ws = wsrepo.getById(shedulerId);
        List<Event> events = loadSKUDService.getReport(dep, ws, LocalDateTime.of(dateFrom, LocalTime.MIN), LocalDateTime.of(dateTo, LocalTime.MAX));
        List<ItemReportSkud> itemsReport = new LinkedList<>();
        if(events == null || events.isEmpty()){
            return new LinkedList<>();
        }
        //удаление выхода с первого события если нет входа
        if(events.get(0).getMessage().trim().equalsIgnoreCase(outMessage)){
            events.remove(0);
        }

        itemsReport = events.stream().map(ev -> new ItemReportSkud().buildCardNumber(ev.getCardNo())
            .buildEmployee(ev.getEmployee()).buildTime(ev, outMessage)).collect(Collectors.toList());
        LinkedHashMap<String, ItemReportSkud> rows = new LinkedHashMap<>();
        //форматирование строк для дневного отделения удаление лишних хождений для курения
        for(ItemReportSkud item : itemsReport){
            if(item.getInputTime() != null) {
                String key = item.getInputTime().toLocalDate().toString() + item.getEmployee().getId();
                //если в мапе есть запись на эту дату входа и сотрудника то пропускаем
                if(!rows.containsKey(key)) {
                    rows.put(key, item);
                }
            }
            if(item.getOutputTime() != null){
                String key = item.getOutputTime().toLocalDate().toString() + item.getEmployee().getId();
                if(rows.containsKey(key)){
                    ItemReportSkud temp = rows.get(key);
                    temp.setOutputTime(item.getOutputTime());
                    rows.put(key, temp);
                }
            }
        }
        //форматирование отчета добавление значения в поле даты и интервала
        List<ItemReportSkud> items = rows.values().stream().map(e -> {
            e.setDate(e.getInputTime().toLocalDate());
            if(e.getInputTime() != null && e.getOutputTime() != null) {
                e.setDuration(Duration.between( e.getInputTime(), e.getOutputTime()));
                if(e.getDuration().compareTo(Duration.ofHours(4L))> 0){
                    e.setDuration(e.getDuration().minusMinutes(45L));
                }
            }

            return e;
        }).toList();
        Map<EmployeeImpl, EmployeeReportSkud> mp = new LinkedHashMap<>();
        for(ItemReportSkud item :items){
            if(mp.containsKey(item.getEmployee())){
                EmployeeReportSkud i = mp.get(item.getEmployee());
                i.getTimeList().add(item);
                mp.put(item.getEmployee(), i);
            }else{
                mp.put(item.getEmployee(), new EmployeeReportSkud(item));
            }
        }
        // досыпать неявки в мапу
        mp = joinNotWorking(dep, ws, dateFrom, dateTo, mp);

        return mp.values().stream().map(l -> {
            if(l != null) {
                l.calculateSummDuration();
            }
            return l;
        }).toList();
    }

    @Override
    public List<Event> getLatecomersByEmployees(Long depId, LocalDateTime terminatorTime) {
        LocalDateTime dateTimeFrom = terminatorTime.plusMinutes(15L);
        LocalDateTime dateTimeTo = terminatorTime.plusHours(3L);
        if(depId != null){
            return loadSKUDService.getLatecomersByEmployees(depId,  dateTimeFrom, dateTimeTo);
        }
        return loadSKUDService.getLatecomersByEmployees( dateTimeFrom, dateTimeTo);

    }

    private Map<EmployeeImpl, EmployeeReportSkud> joinNotWorking(DepartamentImpl dept, Workschedule ws, LocalDate dateFrom, LocalDate dateTo, Map<EmployeeImpl, EmployeeReportSkud> mp){
        List<NotWorking> notWorkings = notWorkingService.findByInterval(dateFrom, dateTo, dept, ws);
        for(NotWorking nw : notWorkings){
            EmployeeReportSkud emps = mp.get(nw.getEmployee());
            if(emps != null){
                List<ItemReportSkud> irlorigin = emps.getTimeList();
                if(irlorigin.isEmpty()){
                    continue;
                }

                LocalDate dateEnd = nw.getEndDate();

                List<ItemReportSkud> irl = new LinkedList<>();
                Set<ItemReportSkud> mpi = new LinkedHashSet<>();

                for(ItemReportSkud ir : irlorigin){
                    if(ir.getDate().isAfter(nw.getBeginDate()) ){

                        for(LocalDate dateStart = nw.getBeginDate() ; dateStart.isBefore(dateEnd); dateStart = dateStart.plusDays(1)) {
                            ItemReportSkud temp = new ItemReportSkud();
                            temp.setInputTime(LocalDateTime.of(dateStart, LocalTime.of(0, 0)));
                            temp.setOutputTime(LocalDateTime.of(dateStart, LocalTime.of(23, 59)));
                            temp.setMessage(nw.getTypeName());
                            temp.setEmployee(nw.getEmployee());
                            temp.setDate(dateStart);
                            temp.setDuration(Duration.ofHours(24L));
                            mpi.add( temp);
                        }
                    }
                }
                mpi.forEach(e -> irl.add(e));
                emps.setTimeList(irl);
            }
            mp.put(nw.getEmployee(), emps);
        }
        return mp;
    }
}
