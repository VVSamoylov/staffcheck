package ru.tvsamara.staff.entity.loadXML;

import jakarta.persistence.*;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.service.fileService.loadSKD.Row;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author venia
 */
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"dateTime", "deviceName"}))
 public class Event {
    private String message;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime dateTime;
    private String deviceName;
    private String cardNo;
    @ManyToOne
    @JoinColumn(name = "employee_id", unique = false, nullable = true)
    private EmployeeImpl employee;
    private String orgName;
    private String tableNo;
    private String editorName;
    private LocalDateTime editorDateTime;

    public String getEditorName() {
        return editorName;
    }

    public void setEditorName(String editorName) {
        this.editorName = editorName;
    }

    public LocalDateTime getEditorDateTime() {
        return editorDateTime;
    }

    public void setEditorDateTime(LocalDateTime editorDateTime) {
        this.editorDateTime = editorDateTime;
    }

    @Transient
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy H:mm:ss");


    public Event(Row row, EmployeeImpl empl) {
        this.message = row.getMessage();
        this.dateTime = LocalDateTime.parse(row.getDateTime(), formatter);  ;
        this.deviceName = row.getDeviceName();
        this.cardNo = row.getCardNo();
        this.orgName = row.getOrgName();
        this.tableNo = row.getTableNo();
        this.employee = empl;
    }

    public Event() {
    }
    public EmployeeImpl getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeImpl employee) {
        this.employee = employee;
    }
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }


    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getTableNo() {
        return tableNo;
    }

    public void setTableNo(String tableNo) {
        this.tableNo = tableNo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "message=" + message + ", dateTime=" + dateTime + ", deviceName=" + deviceName +
            ", cardNo=" + cardNo + ", lastName=" +
            employee.getCardNumber() + ", firstName=" + employee.getFirstName() + ", secondName=" + employee.getLastName() + ", orgName=" + orgName  + ", tableNo=" + tableNo ;
    }

}
