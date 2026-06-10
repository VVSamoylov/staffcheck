package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import java.util.Objects;

/**
 * Сотрудник
 * @author venia
 */
@Entity
@Table(name="employee")
public class EmployeeImpl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String snils;
    private String firstName;
    private String middleName;
    private String lastName;
    private String driverLicense;
    private String cardNumber;
    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "DEPARTAMENT_ID", unique = false, nullable = true)
    private DepartamentImpl dept;

    @ManyToOne
    @JoinColumn(name = "POSITION_ID", unique = false, nullable = true)
    private Position position;
    @ManyToOne
    @JoinColumn(name = "WORKSCHEDULE_ID", unique = false, nullable = true)
    private Workschedule schedule;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     *
     * @return
     */
    public DepartamentImpl getDept() {
        return dept;
    }

    public void setDept(DepartamentImpl dept) {
        this.dept = dept;
    }

    public String getSnils() {
        return snils;
    }

    /**
     *
     * @param snils
     */
    public void setSnils(String snils) {
        this.snils = snils;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Workschedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Workschedule sschedule) {
        this.schedule = sschedule;
    }

    public String getDriverLicense() {
        return driverLicense;
    }

    public void setDriverLicense(String driverLicense) {
        this.driverLicense = driverLicense;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmployeeImpl employee)) return false;
        return  Objects.equals(snils, employee.snils)
            && Objects.equals(firstName, employee.firstName)
            && Objects.equals(middleName, employee.middleName)
            && Objects.equals(lastName, employee.lastName)
            && Objects.equals(dept, employee.dept)
            && Objects.equals(position, employee.position);
    }

    @Override
    public int hashCode() {
        return Objects.hash( snils, firstName, middleName, lastName, dept, position);
    }
    public String getLastName_F_M(){
        return lastName + " " + firstName.charAt(0) + "." + middleName.charAt(0)+".";
    }
}
