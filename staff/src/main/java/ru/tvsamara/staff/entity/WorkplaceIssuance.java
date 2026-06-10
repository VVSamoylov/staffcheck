package ru.tvsamara.staff.entity;

import jakarta.persistence.*;


@Entity
@Table(name="workplaceIssuance")
/**
 * Рабочее место выпуска (Монтажки и пр.)
 */
public class WorkplaceIssuance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String workName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkName() {
        return workName;
    }

    public void setWorkName(String workName) {
        this.workName = workName;
    }
}
