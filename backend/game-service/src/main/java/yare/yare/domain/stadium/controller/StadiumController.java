package yare.yare.domain.stadium.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import yare.yare.domain.stadium.dto.StadiumShapeRes;
import yare.yare.domain.stadium.service.StadiumService;
import yare.yare.global.dto.ResponseDto;

import static yare.yare.global.statuscode.SuccessCode.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/games")
public class StadiumController {

    private final StadiumService stadiumService;

    @GetMapping("/stadiums")
    public ResponseDto<StadiumShapeRes> stadiumShape(
            @RequestParam Integer gradeId) {

        StadiumShapeRes result = stadiumService.getStadiumShape(gradeId);

        return ResponseDto.success(OK, result);
    }
}
