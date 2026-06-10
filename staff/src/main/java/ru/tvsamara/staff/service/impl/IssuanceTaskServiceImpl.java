package ru.tvsamara.staff.service.impl;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.IssuanceTask;
import ru.tvsamara.staff.repository.IssuanceTaskRepository;
import ru.tvsamara.staff.service.api.IssuanceTaskService;
import ru.tvsamara.staff.service.logging.LoggerApp;
import java.util.Locale;
import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class IssuanceTaskServiceImpl implements IssuanceTaskService {
    @Value("${loadTemp}")
    private String patch;
    private LoggerApp LOGGER;
    private final IssuanceTaskRepository issuanceTaskRepository;
    @Autowired
    public IssuanceTaskServiceImpl(IssuanceTaskRepository issuanceTaskRepository, LoggerApp LOGGER) {
        this.issuanceTaskRepository = issuanceTaskRepository;
        this.LOGGER = LOGGER;
    }

    @Override
    public String convertIssuanceTaskToExel(LocalDate start, LocalDate end) {
        DateTimeFormatter formatter = DateTimeFormatter
            .ofPattern("d MMMM yyyy 'г.', EEEE", new Locale("ru"));
        List<IssuanceTask> issuanceTask = issuanceTaskRepository.findAllOrderByDateDesk(start, end);
        String fileName = String.format("%s/out_%s_%s.xlsx", patch, start.toString(), end.toString());
        try ( // Creating input stream
              FileOutputStream outputStream = new FileOutputStream(fileName)) {
            Workbook workbook  = new XSSFWorkbook();
            // Creating a Sheet
            Sheet sheet = workbook.createSheet(String.format("План работы с %s по %s", start.format(formatter), end.format(formatter)));
            //стили
            Font font = workbook.createFont();
            font.setBold(true);
            CellStyle styleHeader = workbook.createCellStyle();
            styleHeader.setFont(font);
            CellStyle style = workbook.createCellStyle();
            style.setFont(font);
            style.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Cell head = sheet.createRow(0).createCell(2);
            head.setCellValue(String.format("План работы с %s по %s", start.format(formatter), end.format(formatter )));
            head.setCellStyle(styleHeader);
            Row headerRow = sheet.createRow(1);
            Cell wp = headerRow.createCell(0);
            wp.setCellValue("Место работы");
            wp.setCellStyle(style);
            Cell staffHeader = headerRow.createCell(1);
            staffHeader.setCellValue("Сотрудники");
            staffHeader.setCellStyle(style);
            Cell projectHeader = headerRow.createCell(2);
            projectHeader.setCellValue("Проект");
            projectHeader.setCellStyle(style);
            Cell dateHeader = headerRow.createCell(3);
            dateHeader.setCellValue("Дата");
            dateHeader.setCellStyle(style);
            Cell startTimeHeader = headerRow.createCell(4);
            startTimeHeader.setCellValue("Время начала");
            startTimeHeader.setCellStyle(style);
            Cell endTimeHeader = headerRow.createCell(5);
            endTimeHeader.setCellValue("Время окончания");
            endTimeHeader.setCellStyle(style);
            int numRow = 2;
            for(var task : issuanceTask){
                Row row = sheet.createRow(numRow++);
                Cell worlkPlace = row.createCell(0);
                worlkPlace.setCellValue(task.getWorkPlace().getWorkName());
                Cell staff = row.createCell(1);
                staff.setCellValue(task.getStaffList().stream().map(st -> st.getLastName_F_M()).collect(Collectors.joining(", ")));
                Cell project = row.createCell(2);
                project.setCellValue(task.getProject());
                Cell date = row.createCell(3);
                date.setCellValue(task.getDate().format(formatter));
                Cell startTime = row.createCell(4);
                startTime.setCellValue(task.getStartTime().toString());
                Cell endTime = row.createCell(5);
                endTime.setCellValue(task.getEndTime().toString());

            }
            IntStream.range(0, 6).forEach(sheet::autoSizeColumn);
            workbook.write(outputStream);
            return fileName;
        }catch (Exception e){
            LOGGER.error(e.getMessage());
        }
        return "";
    }

    @Override
    public List<IssuanceTask> findAllOrderByDateDesk(LocalDate startWindow, LocalDate endWindow) {
        return issuanceTaskRepository.findAllOrderByDateDesk(startWindow, endWindow);
    }

    @Override
    public IssuanceTask findById(Long id) {
        return issuanceTaskRepository.findById(id).orElse(null);
    }
    @Transactional
    @Override
    public void save(IssuanceTask issuanceTask) {
        issuanceTaskRepository.save(issuanceTask);
    }
    @Transactional
    @Override
    public void deleteById(Long id) {
        issuanceTaskRepository.deleteById(id);
    }
}
