package ru.tvsamara.staff.API;

import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import ru.tvsamara.staff.entity.EmployeeImpl;

/**
 *
 * @author venia
 */
public interface Departament {
 
    void setId(Long id);
    String getDepName();
    void setDepName(String depName);
    EmployeeImpl getBoss();
    void setBoss(EmployeeImpl boss);
}
