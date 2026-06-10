package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import ru.tvsamara.staff.entity.IntervalWorkDay;

public interface IntervalWorkDayRepository extends JpaRepository<IntervalWorkDay, Long> {
    @Modifying
    @Query("update IntervalWorkDay item SET item.dutySait = :dutySait, item.dutySocial= :dutySocial WHERE item.id = 1")
    Integer modifaed(Integer dutySait, Integer dutySocial);
}
