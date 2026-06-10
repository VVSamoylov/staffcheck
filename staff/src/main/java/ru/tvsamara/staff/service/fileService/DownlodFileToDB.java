package ru.tvsamara.staff.service.fileService;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ru.tvsamara.staff.Configuration.FileStorageProperties;
import ru.tvsamara.staff.API.Employee;
import ru.tvsamara.staff.DTO.EmployeeDTO;
import ru.tvsamara.staff.entity.NotWorking;
import ru.tvsamara.staff.service.api.EmployeeService;
import ru.tvsamara.staff.service.impl.EmployeeServiceImpl;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@Service
public class DownlodFileToDB {
    private LoggerApp LOGGER;
    private final Path fileStorageLocation;
    private final DateTimeFormatter formatterNotWork = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private EmployeeService employeeService;

    @Autowired
    public DownlodFileToDB(FileStorageProperties fileStorageProperties, EmployeeServiceImpl emplService, LoggerApp loggerApp) {
        this.fileStorageLocation = (Path) Paths.get(fileStorageProperties.getUploadDir())
                    .toAbsolutePath().normalize();
        this.employeeService = emplService;
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(DownlodFileToDB.class);
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            LOGGER.error("Не найдена папка для загрузки файла.", ex);
        }

    }


    public List<Employee>  DownlodFileEmployeeToDB(MultipartFile file) {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        File xlsFile = targetLocation.toFile();
        List<Employee> lemployee = new LinkedList();
        try ( // Creating input stream
                FileInputStream inputStream = new FileInputStream(xlsFile)) {
            Workbook workbook = WorkbookFactory.create(inputStream);

            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> iterator = sheet.iterator();
            boolean startRows = false;

            while (iterator.hasNext()) {
                Row nextRow = iterator.next();
                Iterator<Cell> cellIterator = nextRow.cellIterator();
                Employee empl = new EmployeeDTO();
                while (cellIterator.hasNext()) {

                    Cell cell = cellIterator.next();

                    switch (cell.getCellType()) {
                        case STRING:
                            if("Адрес места проживания".equalsIgnoreCase(cell.getStringCellValue()) && !startRows){
                                startRows = true;
                                continue;
                            }
                            if(!startRows){
                                break;
                            }
                            if(cell.getColumnIndex() == 0){
                                String fn = cell.getStringCellValue();
                                String [] fio = fn.split(" ");
                                empl.setLastName(fio[0]);
                                empl.setFirstName(fio[1]);
                                empl.setMiddleName(fio[2]);
                            }
                            if(cell.getColumnIndex() == 3)
                                empl.setDept(cell.getStringCellValue());
                            if(cell.getColumnIndex() == 10)
                                empl.setJob(cell.getStringCellValue());
                            if(cell.getColumnIndex() == 11)
                                empl.setSnils(cell.getStringCellValue());
                            if(cell.getColumnIndex() == 12)
                                empl.setWorkShedule(cell.getStringCellValue());
                            break;
                        default:
                            break;
                    }
                }
                if(empl.getLastName()!=null)
                lemployee.add(empl);
            }
            workbook.close();

        } catch (IOException ex) {
            LOGGER.error("Ошибка ввода вывода при чтении файла " + file.getOriginalFilename() );
        }
        return lemployee;
    }

    public List<NotWorking>  DownlodFileNotWorkToDB(MultipartFile file) {

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        File xlsFile = targetLocation.toFile();
        List<NotWorking> lnotWorking = new LinkedList();
        try ( // Creating input stream
                FileInputStream inputStream = new FileInputStream(xlsFile)) {
            Workbook workbook = WorkbookFactory.create(inputStream);

            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> iterator = sheet.iterator();
            int startRows = 100;

            while (iterator.hasNext()) {
                Row nextRow = iterator.next();
                Iterator<Cell> cellIterator = nextRow.cellIterator();
                NotWorking nwrk = new NotWorking();
                while (cellIterator.hasNext()) {

                    Cell cell = cellIterator.next();

                    switch (cell.getCellType()) {
                        case STRING:
                            if("ГТРК \"Самара\"".equalsIgnoreCase(cell.getStringCellValue()) && startRows ==100 ){

                                startRows = nextRow.getRowNum();
                                continue;
                            }
                            if(startRows >= nextRow.getRowNum()){
                                break;
                            }
                            if(cell.getColumnIndex() == 0){
                                String fn = cell.getStringCellValue();
                                String [] fio = fn.split(" ");
                                nwrk.setEmployee( employeeService.getEmployeeIdByFullName(fio[0], fio[1], fio[2]));
                            }
                            if(cell.getColumnIndex() == 2)
                                nwrk.setTypeName(cell.getStringCellValue());

                            if(cell.getColumnIndex() == 6)
                                nwrk.setBeginDate(LocalDate.parse(cell.getStringCellValue(), formatterNotWork));
                            if(cell.getColumnIndex() == 7)
                                nwrk.setEndDate(LocalDate.parse(cell.getStringCellValue(), formatterNotWork));
                            break;
                        case NUMERIC:
                            if(cell.getColumnIndex() == 5){
                                double d = cell.getNumericCellValue();
                                nwrk.setWorkDay(Double.valueOf(d).intValue());
                            }

                            break;

                        default:
                            break;
                    }
                }
                if(nwrk.getEmployee() !=null)
                lnotWorking.add(nwrk);
            }
            workbook.close();

        } catch (IOException ex) {
            LOGGER.error("Ошибка ввода вывода при чтении файла " + file.getOriginalFilename() );
        }
        return lnotWorking;
    }
}
