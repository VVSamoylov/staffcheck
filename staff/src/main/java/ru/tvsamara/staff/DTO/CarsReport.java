package ru.tvsamara.staff.DTO;

import ru.tvsamara.staff.API.Car;
import ru.tvsamara.staff.entity.CarImpl;
import ru.tvsamara.staff.entity.OillType;
import java.time.LocalDate;
import java.util.Optional;

/**
 * класс отчета расхода топлива за период за период
 */
public class CarsReport {

    private Car car;
    /**
     * показание на начало периода
     */
    private Double startOdometr;
    /**
     * показания на конец периода
     */
    private Double endOdometr;
    /**
     * Остаток топлива на начало периода
     */
    private Double startSurplus;
    /**
     * Остаток топлива на конец периода
     */
    private Double endSurplus;
    /**
     * Заправлено топлива в литрах
     */
    private Double fillOil;
    /**
     * Полный расход топлива
     */
    private Optional<Double> fullActualFuelConsumption;
    /**
     * Расход топлива на парковке
     */
    private Optional<Double> actualFuelConsuptionParking;
    /**
     * Расход топлива на движении
     */
    private Double actualFuelConsuptionMovement;
    /**
     * Расход топлива на 100 км
     */
    private Double fuelConsumptionRate;

    private OillType oillType;

    private String description;

    private LocalDate  startDate;
    private LocalDate endDate;;

    public CarsReport(CarImpl car, Double startOdometr, Double endOdometr, Double startSurplus,
                      Double endSurplus, Double fillOil, Double fullActualFuelConsumption,
                      Double actualFuelConsuptionParking, Double actualFuelConsuptionMovement,
                      Double fuelConsumptionRate, OillType oillType, String description, LocalDate startDate) {
        this.car = car;
        this.startOdometr = startOdometr;
        this.endOdometr = endOdometr;
        this.startSurplus = startSurplus;
        this.endSurplus = endSurplus;
        this.fillOil = fillOil;
        this.fullActualFuelConsumption = Optional.ofNullable(fullActualFuelConsumption);
        this.actualFuelConsuptionParking = Optional.ofNullable(actualFuelConsuptionParking);
        this.actualFuelConsuptionMovement = actualFuelConsuptionMovement;
        this.fuelConsumptionRate = fuelConsumptionRate;
        this.oillType = oillType;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(CarImpl car) {
        this.car = car;
    }

    public Double getStartOdometr() {
        return startOdometr;
    }

    public void setStartOdometr(Double startOdometr) {
        this.startOdometr = startOdometr;
    }

    public Double getEndOdometr() {
        return endOdometr;
    }

    public void setEndOdometr(Double endOdometr) {
        this.endOdometr = endOdometr;
    }

    public Double getStartSurplus() {
        return startSurplus;
    }

    public void setStartSurplus(Double startSurplus) {
        this.startSurplus = startSurplus;
    }

    public Double getEndSurplus() {
        return endSurplus;
    }

    public void setEndSurplus(Double endSurplus) {
        this.endSurplus = endSurplus;
    }

    public Double getFillOil() {
        return fillOil;
    }

    public void setFillOil(Double fillOil) {
        this.fillOil = fillOil;
    }

    public Optional<Double> getFullActualFuelConsumption() {
        return fullActualFuelConsumption;
    }

    public void setFullActualFuelConsumption(Double fullActualFuelConsumption) {
        this.fullActualFuelConsumption = Optional.ofNullable(fullActualFuelConsumption);
    }

    public Optional<Double> getActualFuelConsuptionParking() {
        return actualFuelConsuptionParking;
    }

    public void setActualFuelConsuptionParking(Double actualFuelConsuptionParking) {
        this.actualFuelConsuptionParking = Optional.ofNullable(actualFuelConsuptionParking);
    }

    public Double getActualFuelConsuptionMovement() {
        return actualFuelConsuptionMovement;
    }

    public void setActualFuelConsuptionMovement(Double actualFuelConsuptionMovement) {
        this.actualFuelConsuptionMovement = actualFuelConsuptionMovement;
    }

    public Double getFuelConsumptionRate() {
        return fuelConsumptionRate;
    }

    public void setFuelConsumptionRate(Double fuelConsumptionRate) {
        this.fuelConsumptionRate = fuelConsumptionRate;
    }

    public OillType getOillType() {
        return oillType;
    }

    public void setOillType(OillType oillType) {
        this.oillType = oillType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
