package ru.tvsamara.staff.service.fileService;

import ru.tvsamara.staff.Configuration.FileStorageProperties;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ru.tvsamara.staff.Exeption.FileStorageException;
import ru.tvsamara.staff.service.logging.LoggerApp;

/**
 *
 * @author venia
 */
@Service
public class FileStorageService {
private final Path fileStorageLocation;
    private LoggerApp LOGGER;
    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties, LoggerApp loggerApp) {
        this.fileStorageLocation = (Path) Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.LOGGER = loggerApp;
        this.LOGGER.setLogger(FileStorageService.class);
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            LOGGER.error("Не найдена папка для загрузки файла.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Некоректное имя файла " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            LOGGER.error("Ошибка сохранени файла " + fileName + ". Ошибка !", ex);

            return "ERROR";
        }
    }
    public boolean deleteFile(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try{
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            return Files.deleteIfExists(targetLocation);
        }catch(IOException ex){
            LOGGER.error("Ошибка удаления файла " + fileName + ". Ошибка !", ex);
        }
        return false;
    }


}
