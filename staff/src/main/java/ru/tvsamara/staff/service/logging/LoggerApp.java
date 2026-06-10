package ru.tvsamara.staff.service.logging;

import org.slf4j.Logger;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class LoggerApp {
    Logger LOGGER;
    public void setLogger(Class<?> clazz){
        LOGGER = org.slf4j.LoggerFactory.getLogger(clazz);
    }
    @Async
    public void info(String message){
        LOGGER.info(message);
    }
    @Async
    public void error(String message){
        LOGGER.error(message);
    }
    @Async
    public void error(String message, Exception e){
        LOGGER.error(message, e);
    }
    @Async
    public void error(Exception e){
        LOGGER.error(e.getMessage(), e);
    }

    public void debug(String message){
        LOGGER.debug(message);
    }
}

