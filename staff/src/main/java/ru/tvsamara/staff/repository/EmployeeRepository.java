package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.DepartamentImpl;
import ru.tvsamara.staff.entity.EmployeeImpl;
import java.util.List;


/**
 *
 * @author venia
 */
@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeImpl, Long> {
    @Query("select e from EmployeeImpl e where e.active=true")
    List<EmployeeImpl> getAllActiveEmployee();
    @Query("select e from EmployeeImpl e where e.id=?1")
  EmployeeImpl getEmployeeById(Long id);
    @Query("select e from EmployeeImpl e  inner join Position p on e.position.id = p.id where e.active = true and p.posName like 'Диспетчер'")
  EmployeeImpl getEmployeeDispatcher();

    @Query(value = "select e from EmployeeImpl  e  inner join Position p on e.position.id = p.id where e.active = true and p.posName like 'Механик'")
    List<EmployeeImpl> getEmployeeMekhanic();
    @Query("select e from EmployeeImpl e where e.lastName=?1 AND e.firstName=?2 AND e.middleName=?3 and e.active=true")
  EmployeeImpl getEmployeeIdByFullName(String lastName, String firstName, String midleName);
    @Query("select e from EmployeeImpl e where e.lastName=?1 AND e.firstName=?2 AND e.middleName=?3 ")
    EmployeeImpl getEmployeeIdByFullNameAll(String lastName, String firstName, String midleName);
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p ON e.position.id = p.id WHERE e.active = true AND p.posName LIKE 'Телеоператор%'")
  Iterable<EmployeeImpl> findAllOperators();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p ON e.position.id = p.id WHERE e.active = true AND p.posName LIKE 'Корреспондент%'")
  Iterable<EmployeeImpl> findAllCorrespondents();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id WHERE e.active = true AND p.posName LIKE 'Специалист 1 категории'")
  List<EmployeeImpl> getEmployeeCorespondents();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id WHERE e.active = true AND p.posName LIKE 'Водитель%'")
  List<EmployeeImpl> getEmployeeDrivers();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id " +
        "WHERE (p.posName = 'Начальник службы' or p.posName = 'Шеф-редактор' or p.posName='Заместитель начальника службы') AND e.active = true ")
    List<EmployeeImpl> getEmployeeAllSheff();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id " +
        "WHERE e.active = true AND p.posName = 'Режиссер телевидения' ")
    List<EmployeeImpl> getEmployeeAllTVProducer();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id " +
        "WHERE e.active = true AND p.posName = 'Специальный корреспондент' ")
    List<EmployeeImpl> getEmployeeAllDutySait();
    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id " +
        "WHERE e.active = true AND p.posName = 'Корреспондент 1 категории' ")
    List<EmployeeImpl> getEmployeeAllSait9_18();

    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id WHERE e.active = true AND p.posName ='Специалист 1 категории'")
    List<EmployeeImpl> findAllManagers();

    @Query("select e FROM EmployeeImpl e INNER JOIN Position p on e.position.id = p.id WHERE e.active = true AND p.posName LIKE 'Начальник%' or p.posName LIKE 'Заместитель%'")
    List<EmployeeImpl> findAllBoss();
    @Query("select e FROM EmployeeImpl e  WHERE e.dept.id = :depart")
    List<EmployeeImpl> findAllByDepartment(Long depart);

}
