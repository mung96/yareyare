package yare.yare.domain.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import yare.yare.domain.admin.service.AdminGameService;
import yare.yare.domain.game.service.GameSeatService;
import yare.yare.global.dto.ResponseDto;
import yare.yare.global.exception.CustomException;

import java.util.Arrays;

import static yare.yare.global.statuscode.ErrorCode.BAD_REQUEST;
import static yare.yare.global.statuscode.SuccessCode.CREATED;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminGameService adminGameService;
    private final GameSeatService gameSeatService;

    private final String[] PostSeasonGameTypes = {"wild-card", "semi-playoff", "playoff", "k-series", "all-stars"};

    @PostMapping("/games/pennant-race")
    public ResponseDto<?> setupPennantRaceGamePlan(@RequestPart(value = "file") MultipartFile file, @RequestParam Integer year) {
        adminGameService.setupPennantRaceGamePlan(file, year);
        return ResponseDto.success(CREATED);
    }

    @PostMapping("/games/post-season")
    public ResponseDto<?> setupPostSeasonGamePlan(@RequestPart(value = "file") MultipartFile file, @RequestParam Integer year, @RequestParam String type) {
        if (Arrays.stream(PostSeasonGameTypes).noneMatch(type::equalsIgnoreCase)) {
            throw new CustomException(BAD_REQUEST);
        }
        adminGameService.setupPostSeasonGamePlan(file, year, type);
        return ResponseDto.success(CREATED);
    }

    @PostMapping("/games/{gameId}/seats/setup")
    public ResponseDto<Void> setupSeatGamePlan(@PathVariable Long gameId) {
        gameSeatService.setupGameSeatByGameId(gameId);
        return ResponseDto.success(CREATED);
    }

}
