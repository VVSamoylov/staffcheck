package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.DTO.WorkPlaneTVDTO;
import ru.tvsamara.staff.entity.WorkPlaneTVImpl;

public interface ConverterWorkPlateAndWorkPaleDTO {
    WorkPlaneTVDTO convertToDTO(WorkPlaneTVImpl entity);
    WorkPlaneTVImpl convertToEntity(WorkPlaneTVDTO dto);
    WorkPlaneTVDTO getWorkPlaneById(Long id);
}
