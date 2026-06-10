package ru.tvsamara.staff.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import ru.tvsamara.staff.entity.WorkplaceIssuance;

@Repository
public interface WorkPlaceIssuanceRepository extends JpaRepository<WorkplaceIssuance, Long> {
}
