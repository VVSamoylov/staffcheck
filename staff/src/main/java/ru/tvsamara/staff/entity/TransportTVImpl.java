package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name="transport")
public class TransportTVImpl  {
    /**
     * номер путевого листа
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * дата выезда
     */
    private LocalDate date;
    /**
     * Водитель
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "employee_ID", nullable = true)
    private EmployeeImpl driver;

    /**
     * машина
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "car_ID", nullable = true)
    private CarImpl car;
    /**
     * тип топлива
     */
    private OillType oillType;
    /**
     * остаток топлива в баке
     */
    private Double remainder;

    /**
     * заправлено
     */
    private Double oilInput;
    /**
     * время работы
     */
    /**
     * остаток топлова при возвращении
     */
    private Double returnRemainder;
    private Double workingHours;

    /**
     * простой часов
     */
    private Double idleHours;

    /**
     * расход топлива при простое
     */
    private Double oilLoss;

    /**
     * время работы с прицепом
     */
    private Double workTrailerHours;

    /**
     * расход прицеп
     */
    private Double oilTrailer;

    /**
     * сезонная надбавка 0 лето
     */
    private Double  seasonalPay;

    /**
     * показания одометра на выезде
     */
    private Double startKilometrage;

    /**
     * показания одометра по окончании работы
     */
    private Double endKilometerage;

    public TransportTVImpl(){}

    @Autowired
    public TransportTVImpl(Long id, LocalDate date, EmployeeImpl driver, CarImpl car, OillType oillType, Double remainder, Double oilInput, Double returnRemainder, Double workingHours, Double idleHours, Double oilLoss, Double workTrailerHours, Double oilTrailer, Double seasonalPay, Double startKilometrage, Double endKilometerage) {
        this.id = id;
        this.date = date;
        this.driver = driver;
        this.car = car;
        this.oillType = oillType;
        this.remainder = remainder;
        this.oilInput = oilInput;
        this.returnRemainder = returnRemainder;
        this.workingHours = workingHours;
        this.idleHours = idleHours;
        this.oilLoss = oilLoss;
        this.workTrailerHours = workTrailerHours;
        this.oilTrailer = oilTrailer;
        this.seasonalPay = seasonalPay;
        this.startKilometrage = startKilometrage;
        this.endKilometerage = endKilometerage;
    }


    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public EmployeeImpl getDriver() {
        return driver;
    }


    public void setDriver(EmployeeImpl driver) {
        this.driver = driver;
    }


    public CarImpl getCar() {
        return car;
    }


    public void setCar(CarImpl car) {
        this.car = car;
    }

    public OillType getOillType() {
        return oillType;
    }

    public void setOillType(OillType oillType) {
        this.oillType = oillType;
    }

    public Double getRemainder() {
        return remainder;
    }

    public void setRemainder(Double remainder) {
        this.remainder = remainder;
    }

    public Double getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(Double workingHours) {
        this.workingHours = workingHours;
    }

    public Double getIdleHours() {
        return idleHours;
    }

    public void setIdleHours(Double idleHours) {
        this.idleHours = idleHours;
    }

    public Double getOilLoss() {
        return oilLoss;
    }

    public void setOilLoss(Double oilLoss) {
        this.oilLoss = oilLoss;
    }

    public Double getWorkTrailerHours() {
        return workTrailerHours;
    }

    public void setWorkTrailerHours(Double workTrailerHours) {
        this.workTrailerHours = workTrailerHours;
    }

    public Double getOilTrailer() {
        return oilTrailer;
    }

    public void setOilTrailer(Double oilTrailer) {
        this.oilTrailer = oilTrailer;
    }

    public Double getSeasonalPay() {
        return seasonalPay;
    }

    public void setSeasonalPay(Double seasonalPay) {
        this.seasonalPay = seasonalPay;
    }

    public Double getStartKilometrage() {
        return startKilometrage;
    }

    public void setStartKilometrage(Double startKilometrage) {
        this.startKilometrage = startKilometrage;
    }

    public Double getEndKilometerage() {
        return endKilometerage;
    }

    public void setEndKilometerage(Double endKilometerage) {
        this.endKilometerage = endKilometerage;
    }

    public Double getOilInput() {
        return oilInput;
    }

    public void setOilInput(Double oilInput) {
        this.oilInput = oilInput;
    }

    public Double getReturnRemainder() {
        return returnRemainder;
    }

    public void setReturnRemainder(Double returnRemainder) {
        this.returnRemainder = returnRemainder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TransportTVImpl transport)) return false;
        return Objects.equals(id, transport.id)
            && Objects.equals(driver, transport.driver)
            && Objects.equals(car, transport.car);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, driver, car);
    }
}
