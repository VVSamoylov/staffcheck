package ru.tvsamara.staff.service.fileService.loadSKD;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import ru.tvsamara.staff.entity.loadXML.Event;
import ru.tvsamara.staff.service.api.EmployeeService;
import ru.tvsamara.staff.service.api.LoadSKUDService;
import ru.tvsamara.staff.service.impl.EmployeeServiceImpl;
import ru.tvsamara.staff.service.impl.LoadSKUDServiceImpl;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import ru.tvsamara.staff.service.logging.LoggerApp;

@Service
public class Loader {
    private LoggerApp LOGGER ;
    /**
     * загрузка пути к папке с файлами СКУД
     */
    @Value("${app.dirLoadXML}")
    private  String dir;
    @Value("${loadTemp}")
    private  String tempPath;
    private LoadSKUDService loadSKUDService;
    private EmployeeService employeeService;
    @Autowired
    public Loader(LoadSKUDServiceImpl servSKD, EmployeeServiceImpl emplService, LoggerApp loggerApp){
        this.loadSKUDService = servSKD;
        this.employeeService = emplService;
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(Loader.class);
    }
    public Set<Path> getFilesList(String dir) {
        try (Stream<Path> stream = Files.list(Paths.get(dir))) {
            return stream
                .filter(file -> !Files.isDirectory(file))
                .map(Path::toString).filter(a -> a.endsWith(".xml")).map(Path::of)
                .collect(Collectors.toSet());
        }catch (IOException ex){
            LOGGER.error(" ошибка папки загрузки СКД " + ex.getMessage());
        }
        return null;
    }

    public Set<Path> getTempFilesList(String dir) {
        try (Stream<Path> stream = Files.list(Paths.get(dir))) {
            return stream
                .map(Path::toString).map(Path::of)
                .collect(Collectors.toSet());
        }catch (IOException ex){
            LOGGER.error(" ошибка удаления файлов из временной папки " + dir + " " + ex.getMessage());
        }
        return null;
    }
    private List<Event> loadXML(Path path){
        try(Stream<String> br  = Files.lines(path)){
            String body = br.collect(Collectors.joining());
            StringReader reader = new StringReader(body);
            JAXBContext context = JAXBContext.newInstance(RowsList.class, Row.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            List<Row> eventList = ((RowsList) unmarshaller.unmarshal(reader)).getListEvent().stream().filter(a -> a.filterPredicat()).toList();
            List<Event> res = eventList.stream().map(a-> new Event(a, employeeService.getEmployeeIdByFullName(a.getLastName(), a.getFirstName(), a.getSecondName()))).
                filter(e-> e.getEmployee() != null).toList();

            System.out.println("count = " + res.size());
            return res;
        }catch(IOException | JAXBException ex ){
            LOGGER.error((" ошибка загрузки файла " + path.toString() + " " + ex.getMessage()));
        }
        return null;
    }
    @Scheduled(initialDelay = 10000, fixedDelayString = "${loadXMLDelay}")
    public void load(){
        try {
            Set<Path> paths = getFilesList(dir);
            if(paths == null || paths.isEmpty()){
                //LOGGER.info("папка с файлами пуста " + dir);
                return;
            }
            paths.stream().forEach(a-> {
                List<Event> events = loadXML(a);
                loadSKUDService.saveAll(events);
                a.toFile().delete();
            });
            paths.clear();
        }catch (NullPointerException ex){
            LOGGER.error(" ошибка загрузки файла значение пути равно " + dir + " " + ex.getMessage());
        }
    }
    @Scheduled(cron = "0 0 22 * * ?", zone = "Europe/Moscow") //0 секунд 0 минут 22 часа каждый день
    public void clear(){
        Set<Path> paths = getTempFilesList(tempPath);
        if(paths == null || paths.isEmpty()){
           // LOGGER.info("папка с файлами пуста");
            return;
        }
        paths.stream().forEach(a-> a.toFile().delete());
    }
}
