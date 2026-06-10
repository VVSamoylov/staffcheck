package ru.tvsamara.staff.DTO;

import ru.tvsamara.staff.Util.Pair;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.entity.PlaneTVTaskImpl;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

public class WorkPlaneTVDTO {
    private Long id;
    /**
     * Утренний шеф TV
     */
    private EmployeeImpl morningTVChef;
    /**
     * Дневной шеф TV
     */
    private EmployeeImpl daytimeTVChef;
    /**
     * Дежурный TV
     */
    private EmployeeImpl dutyTV;
    /**
     * Шеф сайта
     */
    private EmployeeImpl chiefSite;
    /**
     * Дежурный сайта
     */
    private Set<Pair<EmployeeImpl, Boolean>> dutySite;
    /**
     * Дежурный по соцсетям
     */
    private Set<Pair<EmployeeImpl, Boolean>> dutySocial;


    //Дата действия плана
    private LocalDate planeDate;

    //сайт с 9 до18
    private Set<EmployeeImpl> daySaites;

    // список задач плана
    private List<PlaneTVTaskImpl> planeTasks;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Pair<EmployeeImpl, Boolean>> getDutySite() {
        return dutySite;
    }
    public void addDutySite(EmployeeImpl employee, Boolean alarm) {
        if (dutySite == null) {
            dutySite = new HashSet<>();
        }
        dutySite.add(new Pair<>(employee, alarm));
    }

    public void setDutySite(Set<Pair<EmployeeImpl, Boolean>> dutySite) {
        this.dutySite = dutySite;
    }

    public Set<Pair<EmployeeImpl, Boolean>> getDutySocial() {
        return dutySocial;
    }
    public void addDutySocial(EmployeeImpl employee, Boolean alarm) {
         if (dutySocial == null) {
             dutySocial = new HashSet<>();
         }
         dutySocial.add(new Pair<>(employee, alarm));
    }

    public void setDutySocial(Set<Pair<EmployeeImpl, Boolean>> dutySocial) {
        this.dutySocial = dutySocial;
    }

    public LocalDate getPlaneDate() {
        return planeDate;
    }

    public void setPlaneDate(LocalDate planeDate) {
        this.planeDate = planeDate;
    }

    public Set<EmployeeImpl> getDaySaites() {
        return daySaites;
    }

    public void setDaySaites(Set<EmployeeImpl> daySaites) {
        this.daySaites = daySaites;
    }

    public List<PlaneTVTaskImpl> getPlaneTasks() {
        return planeTasks;
    }

    public void setPlaneTasks(List<PlaneTVTaskImpl> planeTasks) {
        this.planeTasks = planeTasks;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WorkPlaneTVDTO that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(morningTVChef, that.morningTVChef) && Objects.equals(daytimeTVChef, that.daytimeTVChef) && Objects.equals(dutyTV, that.dutyTV) && Objects.equals(chiefSite, that.chiefSite) && Objects.equals(dutySite, that.dutySite) && Objects.equals(dutySocial, that.dutySocial) && Objects.equals(planeDate, that.planeDate) && Objects.equals(daySaites, that.daySaites) && Objects.equals(planeTasks, that.planeTasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, morningTVChef, daytimeTVChef, dutyTV, chiefSite, dutySite, dutySocial, planeDate, daySaites, planeTasks);
    }
}
