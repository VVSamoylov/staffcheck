package ru.tvsamara.staff.DTO;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.entity.loadXML.Event;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public class ItemReportSkud {
    private EmployeeImpl employee;
    private LocalDateTime inputTime;
    private LocalDateTime outputTime;
    private LocalDate date;
    private Duration duration;
    private String cardNumber;
    private String message;
    public ItemReportSkud() {
    }

    public ItemReportSkud buildEmployee(EmployeeImpl emp){
        this.employee = emp;
        return this;
    }
    public ItemReportSkud buildCardNumber(String cardNumber){
        this.cardNumber = cardNumber;
        return this;
    }
    public ItemReportSkud buildTime(Event ev, String outType) {
        if(outType.trim().equalsIgnoreCase(ev.getMessage().trim())){
            this.setOutputTime(ev.getDateTime());
        }else{
            this.setInputTime(ev.getDateTime());
        }
        this.setMessage(ev.getMessage());
        return this;
    }

    public EmployeeImpl getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeImpl employee) {
        this.employee = employee;
    }

    public LocalDateTime getInputTime() {
        return inputTime;
    }

    public void setInputTime(LocalDateTime inputTime) {
        this.inputTime = inputTime;
    }

    public LocalDateTime getOutputTime() {
        return outputTime;
    }

    public void setOutputTime(LocalDateTime outputTime) {
        this.outputTime = outputTime;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ItemReportSkud that)) return false;
        return Objects.equals(employee, that.employee) && Objects.equals(inputTime, that.inputTime) && Objects.equals(outputTime, that.outputTime) && Objects.equals(date, that.date) && Objects.equals(duration, that.duration) && Objects.equals(cardNumber, that.cardNumber) && Objects.equals(message, that.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employee, inputTime, outputTime, date, duration, cardNumber, message);
    }
}
