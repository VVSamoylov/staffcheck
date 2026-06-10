package ru.tvsamara.staff.service.api;

import ru.tvsamara.staff.entity.Position;

public interface PositionService {
    Position getByPosName(String name);
    Position save(Position position);
    Position findById(Long id);
    void deleteById(Long id);
    Iterable<Position> findAll();
}
