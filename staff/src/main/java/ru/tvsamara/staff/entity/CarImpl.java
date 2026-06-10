package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import ru.tvsamara.staff.API.Car;

import java.util.Objects;

@Entity
@Table(name="car")
public class CarImpl implements Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String carNumber;
    private String model;
    private Double odometer;
    /**
     * норма расхода топлива
     */
    private Double gasolineNorm;

    public Double getOdometer() {
        return odometer;
    }

    public void setOdometer(Double odometer) {
        this.odometer = odometer;
    }

    @Override
    public String getCarNumber() {
        return carNumber;
    }

    @Override
    public void setCarNumber(String carNumber) {
        this.carNumber = carNumber;
    }

    @Override
    public String getModel() {
        return model;
    }

    @Override
    public void setModel(String model) {
        this.model = model;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public Double getGasolineNorm() {
        return gasolineNorm;
    }

    public void setGasolineNorm(Double gasolineNorm) {
        this.gasolineNorm = gasolineNorm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CarImpl carImpl)) return false;
        return Objects.equals(id, carImpl.id)
            && Objects.equals(carNumber, carImpl.carNumber)
            && Objects.equals(model, carImpl.model);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, carNumber, model);
    }
}
