package ru.tvsamara.staff.service.reports.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.tvsamara.staff.DTO.CarsReport;
import ru.tvsamara.staff.API.Car;
import ru.tvsamara.staff.entity.TransportTVImpl;
import ru.tvsamara.staff.service.api.CarService;
import ru.tvsamara.staff.service.api.TransportTVService;
import ru.tvsamara.staff.service.impl.CarServiceImpl;
import ru.tvsamara.staff.service.impl.TransportTVServiceImpl;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class CarsReportsService {
    private final TransportTVService transprtTVRepository;;
    private final CarService carService;
    private List<CarsReport> carsReportList;
    @Autowired
    public CarsReportsService(TransportTVServiceImpl transprtTVServ, CarServiceImpl carServ) {
        this.transprtTVRepository = transprtTVServ;
        this.carService = carServ;
    }
    public List<CarsReport> getCarsReportByInterval(LocalDate startDate, LocalDate endDate){
        List<CarsReport> tempList = transprtTVRepository.findByDateInterval(startDate,endDate)
            .stream().map(tr -> {
                return new CarsReport(tr.getCar(), tr.getStartKilometrage(), tr.getEndKilometerage(), tr.getRemainder(),
                    tr.getReturnRemainder() , // остаток топлива на конец дня
                    tr.getOilInput(), // заправленно топлива
                    (tr.getRemainder()== null? 0 : tr.getRemainder()) + (tr.getOilInput() == null? 0 : tr.getOilInput())  - (tr.getReturnRemainder()==null? 0 : tr.getRemainder()), //Полный расход топлива
                    tr.getOilLoss(), //Расход топлива на парковке
                    (tr.getRemainder()== null? 0 : tr.getRemainder()) + (tr.getOilInput() == null? 0 : tr.getOilInput())  - (tr.getReturnRemainder()==null? 0 : tr.getRemainder()) - (tr.getOilLoss()==null? 0 : tr.getOilLoss()), // Расход топлива на движении
                    null, //Расход топлива на 100 км
                    tr.getOillType(),
                    "",
                    tr.getDate()
                    );
            }).sorted((f, s)->{
               return f.getStartDate().compareTo(s.getStartDate());
            }).toList();
        Map<Car, CarsReport> carsReportMap = new LinkedHashMap<>();
        for(CarsReport cr : tempList){
            if(carsReportMap.containsKey(cr.getCar())){
                CarsReport carsReport = carsReportMap.get(cr.getCar());
                // проверяем наличие километража по окончанию рейса и значение на новый рейс если они меньше записываем самые последние значения
                if(carsReport.getEndOdometr() != null && carsReport.getEndOdometr() < cr.getStartOdometr()) {
                    carsReport.setEndOdometr(cr.getStartOdometr());
                }
                carsReport.setEndSurplus(cr.getEndSurplus());
                carsReport.setEndDate(cr.getStartDate());
                carsReport.setActualFuelConsuptionParking(carsReport.getActualFuelConsuptionParking().orElse(0.0) + cr.getActualFuelConsuptionParking().orElse(0.0));
                carsReport.setFullActualFuelConsumption(carsReport.getFullActualFuelConsumption().orElse(0.0) + cr.getFullActualFuelConsumption().orElse(0.0));
                carsReport.setActualFuelConsuptionMovement(carsReport.getActualFuelConsuptionMovement() + cr.getActualFuelConsuptionMovement());
                carsReport.setFuelConsumptionRate(carsReport.getFullActualFuelConsumption().orElse(0.0) / 100);
                carsReport.setFillOil(carsReport.getFillOil() + cr.getFillOil());
            }else {
                carsReportMap.put(cr.getCar(), cr);
            }
            }
        carsReportList= carsReportMap.values().stream().toList();
        return carsReportList;
    }

    public List<TransportTVImpl> getCarsReportByIntervalAndCarId(LocalDate startDate, LocalDate endDate, Long car){
        return transprtTVRepository.findByDateIntervalAndCar(startDate,endDate, car);
    }
    public List<TransportTVImpl> getTravelLog(LocalDate startDate, LocalDate endDate){
        return transprtTVRepository.findByDateInterval(startDate, endDate);
    }
}
