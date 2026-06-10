package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.Position;

/**
 *
 * @author venia
 */
@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
    @Query(value = "select p.id, p.pos_name from Position p where p.pos_name=?1 limit 1", nativeQuery = true)
  Position getByPosName(String name);

}
