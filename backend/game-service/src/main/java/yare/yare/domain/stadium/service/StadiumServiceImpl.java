package yare.yare.domain.stadium.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yare.yare.domain.stadium.dto.StadiumShapeRes;
import yare.yare.domain.stadium.entity.Seat;
import yare.yare.domain.stadium.repository.StadiumRepository;
import yare.yare.global.exception.CustomException;

import java.util.List;

import static yare.yare.global.statuscode.ErrorCode.NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StadiumServiceImpl implements StadiumService {

    private final StadiumRepository stadiumRepository;

    @Override
    public StadiumShapeRes getStadiumShape(Integer gradeId) {

        List<Seat> seats = stadiumRepository.findSeatsByGradeId(gradeId);

        if (seats.isEmpty()) {
            throw new CustomException(NOT_FOUND);
        }

        return new StadiumShapeRes(seats);
    }
}
