package ru.tvsamara.staff;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.springframework.http.MediaType;
import ru.tvsamara.staff.entity.Position;
import ru.tvsamara.staff.service.api.EmployeeService;
import ru.tvsamara.staff.service.impl.PositionServiceImpl;

import static org.hamcrest.Matchers.*;
@Disabled
@SpringBootTest
@ContextConfiguration(initializers = {EmployeeTest.Initializer.class})
@AutoConfigureMockMvc
@Testcontainers
public class EmployeeTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private PositionServiceImpl positionService;
    @Autowired
    EmployeeService employeeService;
    //@Container
    public static PostgreSQLContainer<?> postgreSQLContainer = new PostgreSQLContainer<>("postgres:16")
        .withDatabaseName("gtrk")
        .withUsername("testuser")
        .withPassword("testuser")
        .withInitScript("db.sql");
    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                "spring.datasource.url=" + postgreSQLContainer.getJdbcUrl(),
                "spring.datasource.username=" + postgreSQLContainer.getUsername(),
                "spring.datasource.password=" + postgreSQLContainer.getPassword(),
                "spring.jpa.hibernate.ddl-auto=validate",
                "spring.jpa.show-sql=true",
                "spring.datasource.driver-class-name=org.postgresql.Driver",
                "spring.jpa.database=postgresql",
                "hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect"
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }
    @Disabled //Отключил тесты потому что задолбался каждый раз давать рутовое разрешение докеру
    @BeforeEach
    public void setUp() {
        employeeService.deleteAll();
    }
    @Disabled
    @Test
    @DisplayName("Создание и получение сотрудника")
    public void createAndGetEmployee() throws Exception {
        String jsonUser = """
            {
                    "snils": "12-34-45-67-89",
                    "firstName": "Ivan",
                    "middleName": "Vasylievich",
                    "lastName": "Groznii",
                    "driverLicense": "0123456789",
                    "cardNumber": "9876543210",
                    "active": true
            }
            """;
        mockMvc.perform(MockMvcRequestBuilders.post("/employee/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Groznii")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)));

        // Шаг 2: Получаем всех пользователей через GET
        mockMvc.perform(MockMvcRequestBuilders.get("/employee/getallEmpl")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].lastName", is("Groznii")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].active", is(true)));
    }

    @Disabled
    @Test
    @DisplayName("Создание и получение корреспондента")
    public void createAndGetCorrespondent() throws Exception {
        Position position = new Position();
        position.setPosName("Корреспондент");
        positionService.save(position);
        position = positionService.getByPosName("Корреспондент");
        String jsonCorrespondent = String.format("""
            {
                    "snils": "12-34-45-67-88",
                    "firstName": "Ivan",
                    "middleName": "Vasylievich",
                    "lastName": "Chupakabra",
                    "driverLicense": "0123456789",
                    "cardNumber": "9876543210",
                    "active": true,
                    "position":{
                        "id": "%s",
                        "posName": "Корреспондент"
                    }
            }
            """, position.getId());

        mockMvc.perform(MockMvcRequestBuilders.post("/employee/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonCorrespondent))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Chupakabra")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Корреспондент")));

        // Шаг 2: Получаем всех корреспондентов через GET
        mockMvc.perform(MockMvcRequestBuilders.get("/employee/findAllCorrespondent")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(1)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].lastName", is("Chupakabra")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].position.posName", is("Корреспондент")));

    }
    @Disabled
    @Test
    @DisplayName("Создание и получение оператора")
    public void createAndGetOperator() throws Exception {
        Position position = new Position();
        position.setPosName("Телеоператор");
        positionService.save(position);
        position = positionService.getByPosName("Телеоператор");
        String jsonOperator = String.format("""
            {
                    "snils": "12-34-45-67-87",
                    "firstName": "Ivan",
                    "middleName": "Vasylievich",
                    "lastName": "Teleoperatorov",
                    "driverLicense": "0123456789",
                    "cardNumber": "9876543210",
                    "active": true,
                    "position": {
                          "id": "%s",
                          "posName": "Телеоператор 1 категории"
                    }
            }
            """, position.getId());
        mockMvc.perform(MockMvcRequestBuilders.post("/employee/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonOperator))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Teleoperatorov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Телеоператор 1 категории")));

        // Шаг 2: Получаем всех операторов через GET
        mockMvc.perform(MockMvcRequestBuilders.get("/employee/findAllOperator")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(1)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].lastName", is("Teleoperatorov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].position.posName", is("Телеоператор")));
    }
    @Disabled
    @Test
    @DisplayName("Создание и получение Водителя")
    public void createAndGetDriver() throws Exception {
        Position position = new Position();
        position.setPosName("Водитель");
        positionService.save(position);
        position = positionService.getByPosName("Водитель");
        String jsonDriver = String.format("""
            {
                    "snils": "12-34-45-67-86",
                    "firstName": "Ivan",
                    "middleName": "Vasylievich",
                    "lastName": "Driverov",
                    "driverLicense": "0123456789",
                    "cardNumber": "9876543210",
                    "active": true,
                    "position": {
                          "id": "%s",
                          "posName": "Водитель автомобиля 5 разряда"
                    }
            }
            """, position.getId());
        mockMvc.perform(MockMvcRequestBuilders.post("/employee/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonDriver))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Driverov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Водитель автомобиля 5 разряда")));

        // Шаг 2: Получаем всех водителей через GET
        mockMvc.perform(MockMvcRequestBuilders.get("/employee/findAllDriver")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(1)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].lastName", is("Driverov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.[0].position.posName", is("Водитель")));
    }
    @Disabled
    @Test
    @DisplayName("Создание и получение механика")
    public void createAndGetMechanic() throws Exception {
        Position position = new Position();
        position.setPosName("Механик");
        positionService.save(position);
        position = positionService.getByPosName("Механик");
        String jsonMechanic = String.format("""
            {
                    "snils": "12-34-45-67-85",
                    "firstName": "Ivan",
                    "middleName": "Vasylievich",
                    "lastName": "Mechanicov",
                    "driverLicense": "0123456789",
                    "cardNumber": "9876543210",
                    "active": true,
                    "position": {
                        "id": "%s",
                        "posName": "Механик"
                    }
            }
            """, position.getId());
        mockMvc.perform(MockMvcRequestBuilders.post("/employee/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonMechanic))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Mechanicov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Механик")));

        // Шаг 2: Получаем всех механиков через GET
        mockMvc.perform(MockMvcRequestBuilders.get("/employee/findMekhanic")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Mechanicov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Механик")));
    }
    @Disabled
    @Test
    @DisplayName("Создание и получение диспетчера")
    public void createAndGetDispatcher() throws Exception {
        Position position = new Position();
        position.setPosName("Диспетчер");
        positionService.save(position);
        position = positionService.getByPosName("Диспетчер");
        String jsonDispatcher = String.format("""
            {
                    "snils": "12-34-45-67-84",
                    "firstName": "Ivan",
                    "middleName": "Vasylievich",
                    "lastName": "Dispatcherov",
                    "driverLicense": "0123456789",
                    "cardNumber": "9876543210",
                    "active": true,
                    "position": {
                        "id": "%s",
                        "posName": "Диспетчер"
                    }
            }
            """, position.getId());
        mockMvc.perform(MockMvcRequestBuilders.post("/employee/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonDispatcher))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Dispatcherov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Диспетчер")));

        // Шаг 2: Получаем всех диспетчеров через GET
        mockMvc.perform(MockMvcRequestBuilders.get("/employee/findDispatcher")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.firstName", is("Ivan")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.middleName", is("Vasylievich")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.lastName", is("Dispatcherov")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.driverLicense", is("0123456789")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.cardNumber", is("9876543210")))
            .andExpect(MockMvcResultMatchers.jsonPath("$.active", is(true)))
            .andExpect(MockMvcResultMatchers.jsonPath("$.position.posName", is("Диспетчер")));
    }
}
