package ru.tvsamara.staff.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/**
 * поле для хранения интервала рабочих дней
 */
@Entity
@Table(name = "interval_work_day")
public class IntervalWorkDay {
    @Id
    @Column(name = "id")
    private  Long id=1L;
    @Column(name = "duty_sait")
    private Integer dutySait;
    @Column(name = "duty_social")
    private Integer dutySocial;
    public IntervalWorkDay() {
        this.id = 1L;
        this.dutySait = 0;
        this.dutySocial = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDutySait() {
        return dutySait;
    }

    public void setDutySait(Integer dutySait) {
        this.dutySait = dutySait;
    }

    public Integer getDutySocial() {
        return dutySocial;
    }

    public void setDutySocial(Integer dutySocial) {
        this.dutySocial = dutySocial;
    }
}
