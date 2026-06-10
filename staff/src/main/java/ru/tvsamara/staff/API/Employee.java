package ru.tvsamara.staff.API;

/**
 *
 * @author venia
 */
public interface Employee {
    String getDept();
    void setDept(String dept);
    String getJob();
    void setJob(String job);
    String getSnils();
    void setSnils(String snils);
    String getAddress();
    void setAddress(String address);
    String getWorkShedule();
    void setWorkShedule(String workShedule);
    String getLastName();
    void setLastName(String lastName);
    String getFirstName();
    void setFirstName(String firstName);
    String getMiddleName();
    void setMiddleName(String middleName);
    
}
