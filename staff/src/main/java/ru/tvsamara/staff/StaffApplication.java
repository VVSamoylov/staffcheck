package ru.tvsamara.staff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import ru.tvsamara.staff.Configuration.FileStorageProperties;
@ComponentScan("ru.tvsamara.staff")
@EnableJpaRepositories(basePackages = "ru.tvsamara.staff.repository", considerNestedRepositories = true)
@EnableConfigurationProperties({FileStorageProperties.class})
@SpringBootApplication
@EnableScheduling
public class StaffApplication {

    public static void main(String[] args) {
        SpringApplication.run(StaffApplication.class, args);
    }

}
