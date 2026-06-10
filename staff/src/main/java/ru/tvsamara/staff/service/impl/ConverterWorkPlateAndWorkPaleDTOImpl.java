package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.tvsamara.staff.DTO.WorkPlaneTVDTO;
import ru.tvsamara.staff.entity.EmployeeImpl;
import ru.tvsamara.staff.entity.IntervalWorkDay;
import ru.tvsamara.staff.entity.WorkPlaneTVImpl;
import ru.tvsamara.staff.service.api.ConverterWorkPlateAndWorkPaleDTO;
import ru.tvsamara.staff.service.api.IntervalWorkDayService;
import ru.tvsamara.staff.service.api.WorkPlaneTVService;
import java.time.LocalDate;

@Service
public class ConverterWorkPlateAndWorkPaleDTOImpl implements ConverterWorkPlateAndWorkPaleDTO {
    private final IntervalWorkDayService iWdService;
    private final WorkPlaneTVService workPlaneTVService;
    @Autowired
    public ConverterWorkPlateAndWorkPaleDTOImpl(IntervalWorkDayService iWdService, WorkPlaneTVServiceImpl workPlaneTVServ) {
        this.iWdService = iWdService;
        this.workPlaneTVService = workPlaneTVServ;
    }

    @Override
    public WorkPlaneTVDTO convertToDTO(WorkPlaneTVImpl entity) {
        IntervalWorkDay iWd = iWdService.getIntervalWorkDay();
        WorkPlaneTVDTO dto = new WorkPlaneTVDTO();
        if (entity == null) {
            return null;
        }
        dto.setId(entity.getId());
        dto.setMorningTVChef(entity.getMorningTVChef());
        dto.setDaytimeTVChef(entity.getDaytimeTVChef());
        dto.setChiefSite(entity.getChiefSite());
        dto.setDutyTV(entity.getDutyTV());
        dto.setPlaneDate(entity.getPlaneDate());
        dto.setPlaneTasks(entity.getPlaneTasks());
        dto.setDaySaites(entity.getDaySaites());

        var dutySite = entity.getDutySite();
        if (dutySite != null) {
            for (var ds : dutySite) {
                if (ds != null) {
                    EmployeeImpl employee = ds;
                    employee.setSnils("********");
                    int count = workPlaneTVService.findWorkDutySaitAlarm(LocalDate.now().minusDays(iWd.getDutySait()),LocalDate.now(),employee.getId());
                    Boolean alarm = count > 1?true:false;
                    dto.addDutySite(employee, alarm);
                }
            }
        }
        var dutySocial = entity.getDutySocial();
        if (dutySocial != null) {
            for (var ds : dutySocial) {
                if (ds != null) {
                    EmployeeImpl employee = ds;
                    employee.setSnils("********");
                    int count = workPlaneTVService.findWorkDutySocialAlarm(LocalDate.now().minusDays(iWd.getDutySocial()), LocalDate.now(), employee.getId());
                    Boolean alarm = count > 1 ? true : false;
                    dto.addDutySocial(employee, alarm);
                }
            }
        }
        return dto;
    }
    public WorkPlaneTVDTO getWorkPlaneById(Long id){
        return this.convertToDTO(workPlaneTVService.getByIdWorkPlaneTv(id).get());
    }

    @Override
    public WorkPlaneTVImpl convertToEntity(WorkPlaneTVDTO dto) {
        if (dto != null) {
            WorkPlaneTVImpl entity = new WorkPlaneTVImpl();
            entity.setId(dto.getId());
            entity.setMorningTVChef(dto.getMorningTVChef());
            entity.setDaytimeTVChef(dto.getDaytimeTVChef());
            entity.setChiefSite(dto.getChiefSite());
            entity.setPlaneTasks(dto.getPlaneTasks());
            entity.setPlaneDate(dto.getPlaneDate());
            entity.setDaySaites(dto.getDaySaites());
            entity.setDutyTV(dto.getDutyTV());
            var dutySite = dto.getDutySite();
            if (dutySite != null) {
                for (var ds : dutySite) {
                    if (ds != null) {
                        entity.addDutySait(ds.getValue());
                    }
                }
            }
            var dutySocial = dto.getDutySocial();
            if (dutySocial != null) {
                for (var ds : dutySocial) {
                    if (ds != null) {
                        entity.addDutySocial(ds.getValue());
                    }
                }
            }
            return entity;
        }
        return null;
    }
}
