package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.tvsamara.staff.entity.IssuanceTask;
import java.time.LocalDate;
import java.util.List;

public interface IssuanceTaskRepository extends JpaRepository<IssuanceTask, Long> {
    //TODO надо сделать сортировку по дате и рабочему месту и выдавать только на сегодня и поздние даты where date >= curentDate order by date workplace
    @Query("select i from IssuanceTask i where i.date BETWEEN :startWindow AND :endWindow order by i.date desc")
    List<IssuanceTask> findAllOrderByDateDesk(LocalDate startWindow, LocalDate endWindow);
}
