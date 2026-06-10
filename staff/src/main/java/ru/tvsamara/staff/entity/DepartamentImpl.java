
package ru.tvsamara.staff.entity;

import jakarta.persistence.*;
import ru.tvsamara.staff.API.Departament;

import java.util.Objects;

/**
 * Отдел (Подразделение)
 * @author venia
 */
@Entity
@Table(name="departament")
public class DepartamentImpl implements Departament{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }
    @Column(unique = true)
    private String depName;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinColumn(name = "BOSS_ID", nullable = true)
    private EmployeeImpl boss;

    @Override
    public String getDepName() {
        return depName;
    }

    @Override
    public void setDepName(String depName) {
        this.depName = depName;
    }

    @Override
    public EmployeeImpl getBoss() {
        return boss;
    }

    @Override
    public void setBoss(EmployeeImpl boss) {
        this.boss = boss;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DepartamentImpl that)) return false;
        return Objects.equals(id, that.id)
            && Objects.equals(depName, that.depName)
            && Objects.equals(boss, that.boss);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, depName, boss);
    }
}
