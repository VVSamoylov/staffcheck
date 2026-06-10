package ru.tvsamara.staff.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.CarImpl;

import java.util.List;

/**
 *
 * @author venia
 */
@Repository
public interface CarRepository extends JpaRepository<CarImpl, Long> {
     @Query("select c from  CarImpl c where c.model=?1")
     List<CarImpl> getByModel(String name);
     @Query("select c from CarImpl c where c.id=?1")
    CarImpl getById(Long id);
}
