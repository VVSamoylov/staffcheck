package ru.tvsamara.staff.service.impl;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.tvsamara.staff.entity.WorkPlaneTVImpl;
import ru.tvsamara.staff.service.api.DownloadPlaneTv;
import ru.tvsamara.staff.service.api.WorkPlaneTVService;
import ru.tvsamara.staff.service.logging.LoggerApp;
import java.io.FileOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class DownloadPlaneTvImpl implements DownloadPlaneTv {
    @Value("${loadTemp}")
    private String path;
    private LoggerApp LOGGER;
    private final WorkPlaneTVService workPlaneTVService;


    public DownloadPlaneTvImpl(WorkPlaneTVServiceImpl workPlaneTVServ, LoggerApp LOGGER) {
        this.path = path;
        this.workPlaneTVService = workPlaneTVServ;
        this.LOGGER = LOGGER;
    }

    @Override
    public String downloadPlaneTv(Long id) {
        DateTimeFormatter formatter = DateTimeFormatter
            .ofPattern("d MMMM yyyy 'г.', EEEE", new Locale("ru"));
        WorkPlaneTVImpl wPTV = workPlaneTVService.getByIdWorkPlaneTv(id).orElse(null);
        if(wPTV == null){
            return null;
        }
        String planFile= String.format("%s/tvplan_%s.xlsx", this.path, wPTV.getPlaneDate().format(formatter));
        try ( // Creating input stream
              FileOutputStream outputStream = new FileOutputStream(planFile)) {
            Workbook workbook =  workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet(wPTV.getPlaneDate().toString());
            // Шапка
            Font font = workbook.createFont();
            font.setBold(true);
            CellStyle styleHeader = workbook.createCellStyle();
            styleHeader.setFont(font);
            Cell dateTask = sheet.createRow(0).createCell(3);
            dateTask.setCellValue(wPTV.getPlaneDate().toString());
            dateTask.setCellStyle(styleHeader);
            Row rowMChef = sheet.createRow(1);
            Cell cellMChef0 = rowMChef.createCell(1);
            cellMChef0.setCellValue("Утренний шеф ТВ");
            cellMChef0.setCellStyle(styleHeader);
            Cell celMChef = rowMChef.createCell(2);
            celMChef.setCellValue(wPTV.getMorningTVChef().getLastName_F_M());
            celMChef.setCellStyle(styleHeader);
            Row rowDChef = sheet.createRow(2);
            Cell cellDChef0 = rowDChef.createCell(1);
            cellDChef0.setCellValue("Дневной шеф ТВ");
            cellDChef0.setCellStyle(styleHeader);
            Cell celDChef = rowDChef.createCell(2);
            celDChef.setCellValue(wPTV.getDaytimeTVChef().getLastName_F_M());
            celDChef.setCellStyle(styleHeader);
            Row rowDutyTV = sheet.createRow(3);
            Cell cellDutyTV0 = rowDutyTV.createCell(1);
            cellDutyTV0.setCellValue("Дежурный ТВ");
            cellDutyTV0.setCellStyle(styleHeader);
            Cell celDutyTV = rowDutyTV.createCell(2);
            celDutyTV.setCellValue(wPTV.getDutyTV().getLastName_F_M());
            celDutyTV.setCellStyle(styleHeader);
            Row rowChiefSite = sheet.createRow(4);
            Cell cellChiefSite0 = rowChiefSite.createCell(1);
            cellChiefSite0.setCellValue("Шеф сайта");
            cellChiefSite0.setCellStyle(styleHeader);
            Cell celChiefSite = rowChiefSite.createCell(2);
            celChiefSite.setCellValue(wPTV.getChiefSite().getLastName_F_M());
            celChiefSite.setCellStyle(styleHeader);
            Row rowDutySite = sheet.createRow(5);
            Cell cellDutySite0 = rowDutySite.createCell(1);
            cellDutySite0.setCellValue("Дежурный сайт");
            cellDutySite0.setCellStyle(styleHeader);
            Cell celDutySite = rowDutySite.createCell(2);
            celDutySite.setCellValue(wPTV.getDutySite().stream().map(s->s.getLastName_F_M()).collect(Collectors.joining(",")));
            celDutySite.setCellStyle(styleHeader);
            Row rowDaySaites = sheet.createRow(6);
            Cell cellDaySaites0 = rowDaySaites.createCell(1);
            cellDaySaites0.setCellValue("сайт с 9.00 до 18.00");
            cellDaySaites0.setCellStyle(styleHeader);
            Cell celDaySaites = rowDaySaites.createCell(2);
            celDaySaites.setCellValue(wPTV.getDutySocial().stream().map(s->s.getLastName_F_M()).collect(Collectors.joining(",")));
            celDaySaites.setCellStyle(styleHeader);
            Row rowDutySocial = sheet.createRow(7);
            Cell cellDutySocial0 = rowDutySocial.createCell(1);
            cellDutySocial0.setCellValue("Дежурный по социальным сетям");
            cellDutySocial0.setCellStyle(styleHeader);
            Cell celDaySaitesSocial = rowDutySocial.createCell(2);
            celDaySaitesSocial.setCellValue(wPTV.getDutySocial().stream().map(s->s.getLastName_F_M()).collect(Collectors.joining(",")));
            celDaySaitesSocial.setCellStyle(styleHeader);
            // Задачи шапка
            Row rowheaderTask = sheet.createRow(8);

            CellStyle style = workbook.createCellStyle();
            style.setFont(font);
            style.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            Cell taskType = rowheaderTask.createCell(0);
            taskType.setCellValue("ТИП ЗАДАЧИ");
            taskType.setCellStyle(style);
            Cell taskName = rowheaderTask.createCell(1);
            taskName.setCellValue("Название");
            taskName.setCellStyle(style);
            Cell location = rowheaderTask.createCell(2);
            location.setCellValue("Место съемки");
            location.setCellStyle(style);
            Cell corr = rowheaderTask.createCell(3);
            corr.setCellValue("Корреспондент");
            corr.setCellStyle(style);
            Cell operator = rowheaderTask.createCell(4);
            operator.setCellValue("Оператор");
            operator.setCellStyle(style);
            Cell driver = rowheaderTask.createCell(5);
            driver.setCellValue("Водитель");
            driver.setCellStyle(style);
            Cell manager = rowheaderTask.createCell(6);
            manager.setCellValue("Менеджер");
            manager.setCellStyle(style);
            Cell description = rowheaderTask.createCell(7);
            description.setCellValue("Описание");
            description.setCellStyle(style);
            int numberTask=9;
            for (var task: wPTV.getPlaneTasks()) {
                Row row = sheet.createRow(numberTask);
                row.createCell(0).setCellValue(task.getType().toString());
                row.createCell(1).setCellValue(task.getTitle());
                row.createCell(2).setCellValue(task.getShootingLocation());
                row.createCell(3).setCellValue(task.getCorespondent().stream().map(s->s.getLastName_F_M()).collect(Collectors.joining(",")));
                row.createCell(4).setCellValue(task.getOperator().stream().map(s->s.getLastName_F_M()).collect(Collectors.joining(",")));
                row.createCell(5).setCellValue(task.getStartLocation().getCar().getCarNumber() + " " + task.getStartLocation().getDriver().getLastName_F_M() + " " +
                     task.getExitLocation().getCar().getCarNumber() + " " + task.getExitLocation().getDriver().getLastName_F_M());
                row.createCell(6).setCellValue(task.getManager().getLastName_F_M());
                row.createCell(7).setCellValue(task.getDescription().toString());
                numberTask++;
            }
            IntStream.range(0, 7).forEach(sheet::autoSizeColumn);
            workbook.write(outputStream);
            return planFile;

        }catch (Exception e) {
            LOGGER.error(e.getMessage());
        }
        return null;
    }


}
