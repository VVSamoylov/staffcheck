package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.DTO.EmployeeReportSkud;
import ru.tvsamara.staff.entity.WorkPlaneTVImpl;

import java.time.LocalDate;

public interface DownloadPlaneTv {
    String downloadPlaneTv(Long id);

}
