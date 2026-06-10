package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.repository.EmployeeRepository;
import ru.tvsamara.staff.service.api.EmployeeService;

import java.util.List;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Override
    public List<EmployeeImpl> getEmployeeAllDutySait() {
        return employeeRepository.getEmployeeAllDutySait();
    }

    @Override
    public List<EmployeeImpl> getEmployeeAllSait9_18() {
        return employeeRepository.getEmployeeAllSait9_18();
    }

    @Override
    public List<EmployeeImpl> findAllManagers() {
        return employeeRepository.findAllManagers();
    }

    @Override
    public List<EmployeeImpl> findAllBoss() {
        return employeeRepository.findAllBoss();
    }

    @Override
    public List<EmployeeImpl> findAllByDepartment(Long depart) {
        return employeeRepository.findAllByDepartment(depart);
    }

    @Transactional
    @Override
    public void deleteAll() {
         employeeRepository.deleteAll();
    }

    @Transactional
    @Override
    public EmployeeImpl save(EmployeeImpl employee) {
        EmployeeImpl emplBd = employeeRepository.getEmployeeIdByFullNameAll(employee.getLastName(), employee.getFirstName(), employee.getMiddleName());
        employee.setId( emplBd == null ? null : emplBd.getId() );
        employee.setActive(true);
         return employeeRepository.save(employee);
    }

    @Override
    public Iterable<EmployeeImpl> findAll() {
        return employeeRepository.findAll();
    }

    private EmployeeRepository employeeRepository;
    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public List<EmployeeImpl> getEmployeesByDepartmentId(Long departmentId) {
        return employeeRepository.findAllByDepartment(departmentId);
    }

    @Override
    public List<EmployeeImpl> getAllActiveEmployee() {
        return employeeRepository. getAllActiveEmployee();
    }

    @Override
    public EmployeeImpl getEmployeeById(Long id) {
        return employeeRepository.getEmployeeById(id);
    }

    @Override
    public EmployeeImpl getEmployeeDispatcher() {
        return employeeRepository.getEmployeeDispatcher();
    }

    @Override
    public EmployeeImpl getEmployeeMekhanic() {
        return employeeRepository.getEmployeeMekhanic().get(0);
    }

    @Override
    public EmployeeImpl getEmployeeIdByFullName(String lastName, String firstName, String midleName) {
        return employeeRepository.getEmployeeIdByFullName(lastName, firstName, midleName);
    }

    @Override
    public Iterable<EmployeeImpl> findAllOperators() {
        return employeeRepository.findAllOperators();
    }

    @Override
    public Iterable<EmployeeImpl> findAllCorrespondents() {
        return employeeRepository.findAllCorrespondents();
    }

    @Override
    public List<EmployeeImpl> getEmployeeCorespondents() {
        return employeeRepository.getEmployeeCorespondents();
    }

    @Override
    public List<EmployeeImpl> getEmployeeDrivers() {
        return employeeRepository.getEmployeeDrivers();
    }

    @Override
    public List<EmployeeImpl> getEmployeeAllSheff() {
        return employeeRepository.getEmployeeAllSheff();
    }

    @Override
    public List<EmployeeImpl> getEmployeeAllTVProducer() {
        return employeeRepository.getEmployeeAllTVProducer();
    }

}
