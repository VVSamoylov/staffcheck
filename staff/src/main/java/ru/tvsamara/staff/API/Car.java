package ru.tvsamara.staff.API;

public interface Car {
    String getCarNumber();
    void setOdometer(Double odometer);
    Double getOdometer();
    void setCarNumber(String carNumber);

    String getModel();

    void setModel(String model);

    Long getId();

    void setId(Long id);

    @Override
    boolean equals(Object o);

    @Override
    int hashCode();
}
