package ru.tvsamara.staff.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.TransportTVImpl;
import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author venia
 */
@Repository
public interface TransportTVRepository extends JpaRepository<TransportTVImpl, Long> {
     @Query("select c from TransportTVImpl c where c.id=?1")
     TransportTVImpl getById(Long id);
    @Query("select c from TransportTVImpl c order by c.date desc")
    List<TransportTVImpl> findAllSort();

    @Query("select tr from TransportTVImpl tr where tr.date BETWEEN ?1 and ?2 order by tr.date, tr.startKilometrage desc")
    List<TransportTVImpl> findByDateInterval(LocalDate startDate, LocalDate endDate);
    @Query("select tr from TransportTVImpl tr where tr.car.id = ?3 and tr.date BETWEEN ?1 and ?2 order by tr.date, tr.startKilometrage desc")
    List<TransportTVImpl> findByDateIntervalAndCar(LocalDate startDate, LocalDate endDate, Long carId);
}
