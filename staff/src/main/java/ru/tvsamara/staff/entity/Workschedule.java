package ru.tvsamara.staff.entity;

import jakarta.persistence.*;

import java.util.Objects;

/**
 * График работы
 * @author venia
 */
@Entity
@Table(name="workschedule")
public class Workschedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String scheduleName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getScheduleName() {
        return scheduleName;
    }

    public void setScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Workschedule that)) return false;
        return Objects.equals(id, that.id)
            && Objects.equals(scheduleName, that.scheduleName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, scheduleName);
    }
}
