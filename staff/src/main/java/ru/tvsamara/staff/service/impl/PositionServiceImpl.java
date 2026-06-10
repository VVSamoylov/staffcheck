package ru.tvsamara.staff.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tvsamara.staff.entity.Position;
import ru.tvsamara.staff.repository.PositionRepository;
import ru.tvsamara.staff.service.api.PositionService;
@Service
public class PositionServiceImpl implements PositionService {
    private final PositionRepository positionRepository;
    @Autowired
    public PositionServiceImpl(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @Override
    public Position getByPosName(String name) {
        try{
            return positionRepository.getByPosName(name);
        }catch (Exception e){
            return null;
        }

    }
    @Transactional
    @Override
    public Position save(Position position) {
        Position posDb = positionRepository.getByPosName(position.getPosName());
        if(posDb != null){
            return posDb;
        }
        return positionRepository.save(position);
    }

    @Override
    public Position findById(Long id) {
        return positionRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        positionRepository.deleteById(id);
    }

    @Override
    public Iterable<Position> findAll() {
        return positionRepository.findAll();
    }
}
