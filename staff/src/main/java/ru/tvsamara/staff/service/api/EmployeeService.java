package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.EmployeeImpl;

import java.util.List;

public interface EmployeeService {
    List<EmployeeImpl> getEmployeesByDepartmentId(Long departmentId);
    List<EmployeeImpl> getAllActiveEmployee();
    EmployeeImpl getEmployeeById(Long id);
    EmployeeImpl getEmployeeDispatcher();
    EmployeeImpl getEmployeeMekhanic();
    EmployeeImpl getEmployeeIdByFullName(String lastName, String firstName, String midleName);
    Iterable<EmployeeImpl> findAllOperators();
    Iterable<EmployeeImpl> findAllCorrespondents();
    List<EmployeeImpl> getEmployeeCorespondents();
    List<EmployeeImpl> getEmployeeDrivers();
    List<EmployeeImpl> getEmployeeAllSheff();
    List<EmployeeImpl> getEmployeeAllTVProducer();
    List<EmployeeImpl> getEmployeeAllDutySait();
    List<EmployeeImpl> getEmployeeAllSait9_18();
    List<EmployeeImpl> findAllManagers();
    List<EmployeeImpl> findAllBoss();
    List<EmployeeImpl> findAllByDepartment(Long depart);
    void deleteAll();
    EmployeeImpl save(EmployeeImpl employee);
    Iterable<EmployeeImpl> findAll();
}
