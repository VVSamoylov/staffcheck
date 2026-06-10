package ru.tvsamara.staff.DTO;

import java.time.Duration;
import java.util.LinkedList;
import java.util.List;

public class EmployeeReportSkud {
    Duration sum;
    List<ItemReportSkud> timeList;
    public void calculateSummDuration(){
        this.sum = Duration.ofMinutes(timeList.stream().map(e ->{
            if(e != null && e.getDuration() != null){
                return e.getDuration().toMinutes();
            }
            return Long.valueOf(0L);}
            )
            .reduce(0L, (d1, d2)-> {
                if(d1 != null && d2 != null){
                    return   d1 + d2;
                }
                return 0L;
            }));
    }
    public Duration getSum() {
        return sum;
    }

    public void setSum(Duration sum) {
        this.sum = sum;
    }

    public List<ItemReportSkud> getTimeList() {
        return timeList;
    }

    public void setTimeList(List<ItemReportSkud> timeList) {
        this.timeList = timeList;
    }

    public EmployeeReportSkud() {
        this.timeList = new LinkedList<>();
    }
    public EmployeeReportSkud(ItemReportSkud reportSkud) {
        this.timeList = new LinkedList<>();
        this.timeList.add(reportSkud);
    }
}
