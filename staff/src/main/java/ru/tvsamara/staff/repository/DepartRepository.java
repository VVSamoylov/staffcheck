package ru.tvsamara.staff.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.DepartamentImpl;

/**
 *
 * @author venia
 */
@Repository
public interface DepartRepository  extends JpaRepository<DepartamentImpl, Long> {
     @Query("select d from DepartamentImpl d where d.depName=?1")
  DepartamentImpl getByDepName(String name);
     @Query("select d from DepartamentImpl d where d.id=?1")
  DepartamentImpl getByDepId(Long id);
}
