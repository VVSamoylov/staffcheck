package ru.tvsamara.staff.service.impl;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.DTO.EmployeeReportSkud;
import ru.tvsamara.staff.entity.loadXML.Event;
import ru.tvsamara.staff.service.api.DownloadSKUD;
import ru.tvsamara.staff.service.api.LoadSKUDService;
import ru.tvsamara.staff.service.logging.LoggerApp;
import ru.tvsamara.staff.service.reports.skud.SkudReportServiceImpl;

import java.io.FileOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.IntStream;

@Service
public class DownloadSkudImpl implements DownloadSKUD {
    @Value("${loadTemp}")
    private String path;
    private LoggerApp LOGGER;
    private final SkudReportServiceImpl skdservice;
    private final LoadSKUDService loadSKUDService;
    private final EmployeeServiceImpl employeeService;
    @Autowired
    public DownloadSkudImpl(LoggerApp LOGGER, SkudReportServiceImpl skdservice, LoadSKUDServiceImpl loadSKUDServ, EmployeeServiceImpl employeeService) {
        this.path = path;
        this.LOGGER = LOGGER;
        this.skdservice = skdservice;
        this.loadSKUDService = loadSKUDServ;
        this.employeeService = employeeService;
        this.LOGGER.setLogger(DownloadSkudImpl.class);
    }

    @Override
    public String downloadSkud(Long depId, Long shedulerId, LocalDate dateFrom, LocalDate dateTo) {
        DateTimeFormatter formatter = DateTimeFormatter
            .ofPattern("d MMMM yyyy 'г'_ EEEE", new Locale("ru"));
        String skudFile= String.format("%s/skud_%s_%s.xlsx", this.path,
            dateFrom.format(formatter).replaceAll(" ","_" ), dateTo.format(formatter).replaceAll(" ","_" ));
        List<EmployeeReportSkud> res = skdservice.getItemSkud(depId, shedulerId, dateFrom, dateTo);
        try ( // Creating input stream
              FileOutputStream outputStream = new FileOutputStream(skudFile)) {
            Workbook workbook =  workbook = new XSSFWorkbook();
            // Creating a Sheet
            Sheet sheet = workbook.createSheet(String.format("Отчет СКУД с %s по %s", dateFrom.format(formatter), dateTo.format(formatter)));
            // Шапка
            Font font = workbook.createFont();
            font.setBold(true);
            CellStyle styleHeader = workbook.createCellStyle();
            styleHeader.setFont(font);
            //Болезнь
            CellStyle styleDisease= workbook.createCellStyle();
            styleDisease.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            styleDisease.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            //Отпуск
            CellStyle styleVacation= workbook.createCellStyle();
            styleVacation.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            styleVacation.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle style = workbook.createCellStyle();
            style.setFont(font);
            style.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Cell celDate = sheet.createRow(0).createCell(0);
            celDate.setCellValue(String.format("Отчет СКУД с  %s по %s", dateFrom.format(formatter), dateTo.format(formatter)));
            celDate.setCellStyle(styleHeader);
            //Шапка таблицы
            Row headerRow = sheet.createRow(1);
            Cell cellName = headerRow.createCell(0);
            cellName.setCellValue("Сотрудник Ф.И.О");
            cellName.setCellStyle(style);
            Cell cellAllTimeHeader = headerRow.createCell(1);
            cellAllTimeHeader.setCellValue("Общее время");
            cellAllTimeHeader.setCellStyle(style);
            int cellHeaderNumm  = 2;
            int maxCell = 0;
            for (LocalDate start = LocalDate.of(dateFrom.getYear(), dateFrom.getMonth(), dateFrom.getDayOfMonth());
                 start.isBefore(dateTo)   ; start = start.plusDays(1)) {
                Cell cell = headerRow.createCell(cellHeaderNumm++);
                cell.setCellValue(start.getDayOfMonth() + "." + start.getMonthValue() + "." + start.getYear());
                cell.setCellStyle(style);
                maxCell++;
            }

            int rowNum = 2;

            for (EmployeeReportSkud item : res) {
                if(item==null){
                    rowNum++;
                    continue;
                }
                Row row = sheet.createRow(rowNum);
                row.createCell(0).setCellValue(item.getTimeList().get(0).getEmployee().getLastName_F_M());
                row.createCell(1).setCellValue(item.getSum().toHours() + " ч." + item.getSum().toMinutes()%60 + " м.");
                rowNum++;

                int cellNum =2;

                LocalDate start = LocalDate.of(dateFrom.getYear(), dateFrom.getMonth(), dateFrom.getDayOfMonth());
                for ( var r : item.getTimeList()) {
                    if(r==null || r.getDuration() == null){
                        continue;
                    }
                    if( r.getDate().isAfter(dateTo)){
                        break;
                    }
                    for(;!start.toString().equalsIgnoreCase(r.getDate().toString());start = start.plusDays(1)){
                        Cell cell = row.createCell(cellNum++);
                    }
                    Cell cell = row.createCell(cellNum++);
                    cell.setCellValue(r.getDuration().toHours() + " ч." + r.getDuration().toMinutes() % 60 + " м.");
                    if ("Болезнь".equalsIgnoreCase(r.getMessage())) {
                       cell.setCellStyle(styleDisease);
                    } else if ("Отпуск".equalsIgnoreCase(r.getMessage())) {
                       cell.setCellStyle(styleVacation);
                    }
                    start = start.plusDays(1);
                }
            }

            IntStream.range(0, maxCell).forEach(sheet::autoSizeColumn);
            workbook.write(outputStream);
            return skudFile;
        }catch (Exception e) {
            LOGGER.error(e.getMessage());

        }
        return null;
    }

    @Override
    public List<Event> getSkudEventEmployeeById(Long employeeId, LocalDate dateFrom, LocalDate dateTo) {
        LocalDateTime dateTimeFrom = LocalDateTime.of(dateFrom.getYear(), dateFrom.getMonth(), dateFrom.getDayOfMonth(), 0, 0);
        LocalDateTime dateTimeTo = LocalDateTime.of(dateTo.getYear(), dateTo.getMonth(), dateTo.getDayOfMonth(), 23, 59);
        return this.loadSKUDService.getListEmployeeBetweenDate(employeeId, dateTimeFrom, dateTimeTo);
    }

    @Override
    public Boolean setSkudEventEmployee( Event event){
        try {
            this.loadSKUDService.save(event);
        }catch (Exception e){
            LOGGER.error("Ошибка редактирвования записи СКУД id: " + event.getId() );
            return false;
        }

        return true;
    }


    @Override
    public Boolean deleteSkudEventById(Long id) {
        try {
            loadSKUDService.deleteById(id);
        }catch (Exception e){
            LOGGER.error("Ошибка удаления записи СКУД id: " + id);
            return false;
        }
        return true;
    }

    @Override
    public String getSkudReportLatecomersByEmployees(Long deptId, LocalDateTime terminateTime) {
        DateTimeFormatter formatter = DateTimeFormatter
            .ofPattern("d MMMM yyyy 'г'_ EEEE", new Locale("ru"));
        String skudFile= String.format("%s/skud_lates_%s_.xlsx", this.path, terminateTime.toLocalDate().format(formatter).replaceAll(" ", "_"));
        List<Event> res = skdservice.getLatecomersByEmployees(deptId, terminateTime);
        try (
              FileOutputStream outputStream = new FileOutputStream(skudFile)) {
            Workbook workbook = workbook = new XSSFWorkbook();
            // Creating a Sheet
            Sheet sheet = workbook.createSheet(String.format("Отчет СКУД опоздавшие %s ", terminateTime.toLocalDate().format(formatter)));
            // Шапка
            Font font = workbook.createFont();
            font.setBold(true);
            CellStyle styleHeader = workbook.createCellStyle();
            styleHeader.setFont(font);
            //Болезнь
            CellStyle styleDisease = workbook.createCellStyle();
            styleDisease.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
            styleDisease.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            //Отпуск
            CellStyle styleVacation = workbook.createCellStyle();
            styleVacation.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            styleVacation.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            CellStyle style = workbook.createCellStyle();
            style.setFont(font);
            style.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Cell celDate = sheet.createRow(0).createCell(0);
            celDate.setCellValue(String.format("Отчет СКУД по опоздавшим  с  %s ", terminateTime.format(formatter)));
            celDate.setCellStyle(styleHeader);
            //Шапка таблицы
            Row headerRow = sheet.createRow(1);
            Cell cellTime = headerRow.createCell(0);
            cellTime.setCellValue("Дата Время");
            cellTime.setCellStyle(style);
            Cell cellName = headerRow.createCell(1);
            cellName.setCellValue("Сотрудник Ф.И.О");
            cellName.setCellStyle(style);
            Cell cellAllTimeHeader = headerRow.createCell(2);
            cellAllTimeHeader.setCellValue("Отдел");
            cellAllTimeHeader.setCellStyle(style);
            for (Event item : res) {
                if (item != null) {
                    Row row = sheet.createRow(sheet.getLastRowNum() + 1);
                    row.createCell(0).setCellValue(item.getDateTime().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")));
                    row.createCell(1).setCellValue(item.getEmployee().getLastName_F_M());
                    row.createCell(2).setCellValue(item.getEmployee().getDept().getDepName());
                }
            }
            IntStream.range(0, 5).forEach(sheet::autoSizeColumn);
            workbook.write(outputStream);
            return skudFile;
        }catch (Exception e) {
            LOGGER.error("Ошибка формирования отчета СКУД на " + terminateTime.toLocalDate().format(formatter));
        }
        return "";
    }

}
