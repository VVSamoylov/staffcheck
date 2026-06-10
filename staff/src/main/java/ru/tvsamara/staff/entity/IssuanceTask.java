package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "issuanceTask")
/**
 * Задачи по выпуску
 */
public class IssuanceTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.DETACH)
    @JoinColumn(name="workplaceId")
    private WorkplaceIssuance workPlace;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    /**
     * над каким проектом (из названия съемок) выполняется работа
     */
    private String project;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "listTaskStaff", joinColumns = @JoinColumn(name = "issuanceTaskId", referencedColumnName = "id", nullable = true),
        inverseJoinColumns = @JoinColumn(name="employeeId", referencedColumnName = "id", nullable = true))
    private Set<EmployeeImpl> staffList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WorkplaceIssuance getWorkPlace() {
        return workPlace;
    }

    public void setWorkPlace(WorkplaceIssuance workPlace) {
        this.workPlace = workPlace;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String porject) {
        this.project = porject;
    }

    public Set<EmployeeImpl> getStaffList() {
        return staffList;
    }

    public void setStaffList(Set<EmployeeImpl> staffList) {
        this.staffList = staffList;
    }
}
