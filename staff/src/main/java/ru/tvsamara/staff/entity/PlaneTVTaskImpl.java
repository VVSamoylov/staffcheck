package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="planetask")
public class PlaneTVTaskImpl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * тип задачи
     */
    @Enumerated(EnumType.STRING)
    private TaskType type;
    /**
     * название
     */
    private String title;
    /**
     *  Время начала
      */
    private LocalTime startTime;
    /**
     *  Время окончания
     */
    private LocalTime endTime;
    /**
     * Статус задачи
     */
    @Enumerated(EnumType.STRING)
    private TaskProgress progress;
    /**
     *  Место съемки
      */
    private String shootingLocation;

    /**
     * Корреспондент
     */
    @ManyToMany (fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "list_task_corespondents", joinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name="corespondemt_id", referencedColumnName = "id"))
    private List<EmployeeImpl> corespondent;
    /**
     * Оператор
     */
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    //@JoinColumn(name = "operator_id", nullable = true)
    private List<EmployeeImpl> operator;
    /**
     * Транспорт (водитель и номер машины) привоз на место
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "transportstart_id", nullable = true)
    private TransportTVImpl startLocation;
    /**
     * Транспорт (водитель и номер машины) отвоз с место
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "transportexit_id", nullable = true)
    private TransportTVImpl exitLocation;
    /**
     * Менеджер
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "manager_id", nullable = true)
    private EmployeeImpl manager;
    /**
     * информация о съемке
     */
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public TaskProgress getProgress() {
        return progress;
    }

    public void setProgress(TaskProgress progress) {
        this.progress = progress;
    }

    public String getShootingLocation() {
        return shootingLocation;
    }

    public void setShootingLocation(String shootingLocation) {
        this.shootingLocation = shootingLocation;
    }

    public List<EmployeeImpl> getCorespondent() {
        return corespondent;
    }

    public void setCorespondent(List<EmployeeImpl> corespondent) {
        this.corespondent = corespondent;
    }

    public List<EmployeeImpl> getOperator() {
        return operator;
    }

    public void setOperator(List<EmployeeImpl> operator) {
        this.operator = operator;
    }

    public TransportTVImpl getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(TransportTVImpl startLocation) {
        this.startLocation = startLocation;
    }

    public TransportTVImpl getExitLocation() {
        return exitLocation;
    }

    public void setExitLocation(TransportTVImpl exitLocation) {
        this.exitLocation = exitLocation;
    }

    public EmployeeImpl getManager() {
        return manager;
    }

    public void setManager(EmployeeImpl manager) {
        this.manager = manager;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlaneTVTaskImpl that)) return false;
        return Objects.equals(id, that.id)
            && type == that.type
            && Objects.equals(title, that.title)
            && Objects.equals(startTime, that.startTime)
            && Objects.equals(endTime, that.endTime)
            && Objects.equals(shootingLocation, that.shootingLocation)
            && Objects.equals(corespondent, that.corespondent)
            && Objects.equals(operator, that.operator)
            && Objects.equals(startLocation, that.startLocation)
            && Objects.equals(exitLocation, that.exitLocation)
            && Objects.equals(manager, that.manager)
            && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, title, startTime, endTime, shootingLocation, corespondent, operator, startLocation, exitLocation, manager, description);
    }
}
