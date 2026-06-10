
package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * План на телесъемку (Шапка)
 * @author venia
 */
@Entity
@Table(name="workplanetv")
public class WorkPlaneTVImpl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Утренний шеф TV
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "morningtvchef_id", nullable = true)
    private EmployeeImpl morningTVChef;
    /**
     * Дневной шеф TV
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "daytimetvchef_id", nullable = true)
    private EmployeeImpl daytimeTVChef;
    /**
     * Дежурный TV
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "duttytv_id", nullable = true)
    private EmployeeImpl dutyTV;
    /**
     * Шеф сайта
     */
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "chiefsite_id", nullable = true)
    private EmployeeImpl chiefSite;
    /**
     * Дежурный сайта
     */
    @ManyToMany (fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "list_duty", joinColumns = @JoinColumn(name="planetv_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name="employee_id", referencedColumnName = "id"))
    private Set<EmployeeImpl> dutySite;

    /**
     * Дежурный по социальным сетям
     */
    @ManyToMany (fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "list_dutysocial", joinColumns = @JoinColumn(name="planetv_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name="employee_id", referencedColumnName = "id"))
    private Set<EmployeeImpl> dutySocial;

    //Дата действия плана
    private LocalDate planeDate;

    //сайт с 9 до18
    @ManyToMany (fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "list_daysaite", joinColumns = @JoinColumn(name = "planetv_id", referencedColumnName = "id", nullable = true),
    inverseJoinColumns = @JoinColumn(name="employee_id", referencedColumnName = "id", nullable = true))
    private Set<EmployeeImpl> daySaites;

    // список задач плана
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE )
    @JoinColumn(name="plane_tv_id", nullable=true)
    private List<PlaneTVTaskImpl> planeTasks;


    public Long getId() {
        return id;
    }


    public EmployeeImpl getMorningTVChef() {
        return morningTVChef;
    }


    public void setMorningTVChef(EmployeeImpl morningTVChef) {
        this.morningTVChef = morningTVChef;
    }


    public EmployeeImpl getDaytimeTVChef() {
        return daytimeTVChef;
    }


    public void setDaytimeTVChef(EmployeeImpl daytimeTVChef) {
        this.daytimeTVChef = daytimeTVChef;
    }


    public EmployeeImpl getDutyTV() {
        return dutyTV;
    }


    public void setDutyTV(EmployeeImpl dutyTV) {
        this.dutyTV = dutyTV;
    }


    public EmployeeImpl getChiefSite() {
        return chiefSite;
    }


    public void setChiefSite(EmployeeImpl chiefSite) {
        this.chiefSite = chiefSite;
    }


    public Set<EmployeeImpl> getDutySite() {
        return dutySite;
    }


    public void setDutySite(Set<EmployeeImpl> dutySite) {
        this.dutySite = dutySite;
    }
    public void addDutySait(EmployeeImpl staff){
        if(dutySite == null){
            dutySite = new HashSet<>();
        }
        dutySite.add((staff));
    }

    public Set<EmployeeImpl> getDutySocial() {
        return dutySocial;
    }


    public void setDutySocial(Set<EmployeeImpl> dutySocial) {
        this.dutySocial = dutySocial;
    }
    public void addDutySocial(EmployeeImpl staff){
        if(dutySocial == null){
            dutySocial = new HashSet<>();
        }
        dutySocial.add((staff));
    }
   // @Override
    public Set<EmployeeImpl> getDaySaites() {
        return daySaites;
    }

    public void setDaySaites(Set<EmployeeImpl> daySait) {
        this.daySaites = daySait;
    }
    public void addStaffSait(EmployeeImpl staff){
        if (daySaites == null) {
            daySaites = new HashSet<>();
        }
        daySaites.add(staff);
    }

    public String getPlaneName() {
        return planeName;
    }


    public void setPlaneName(String planeName) {
        this.planeName = planeName;
    }


    public LocalDate getPlaneDate() {
        return planeDate;
    }


    public void setPlaneDate(LocalDate planeDate) {
        this.planeDate = planeDate;
    }


    public List<PlaneTVTaskImpl> getPlaneTasks() {
        return planeTasks;
    }


    public void setPlaneTasks(List<PlaneTVTaskImpl> planeTasks) {
        this.planeTasks = planeTasks;
    }



    public void setId(Long id) {
        this.id = id;
    }
    private String planeName;



}
