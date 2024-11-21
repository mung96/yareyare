package yare.yare.domain.admin.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import yare.yare.domain.game.entity.Game;
import yare.yare.domain.game.repository.GameRepository;
import yare.yare.domain.price_option.entity.Category;
import yare.yare.domain.price_option.entity.Season;
import yare.yare.domain.price_option.repository.CategoryRepository;
import yare.yare.domain.price_option.repository.SeasonRepository;
import yare.yare.domain.team.entity.Team;
import yare.yare.domain.team.repository.TeamRepository;
import yare.yare.global.exception.CustomException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static java.time.DayOfWeek.SATURDAY;
import static java.time.DayOfWeek.SUNDAY;
import static yare.yare.global.statuscode.ErrorCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminGameServiceImpl implements AdminGameService {

    private final GameRepository gameRepository;
    private final TeamRepository teamRepository;
    private final SeasonRepository seasonRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public void setupPennantRaceGamePlan(MultipartFile file, Integer year) {
        LocalDateTime currentDateTime = LocalDateTime.now();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = CSVFormat.EXCEL.builder()
                     .setHeader()
                     .build()
                     .parse(reader)
        ) {
            for (CSVRecord record : csvParser) {

                String date = record.get("date");
                String time = record.get("time");

                LocalDate gameDate = parseDate(year, date);
                LocalTime startTime = LocalTime.parse(time);

                String homeTeamName = record.get("home_team");
                String awayTeamName = record.get("away_team");

                Team homeTeam = getTeamByName(homeTeamName);
                Team awayTeam = getTeamByName(awayTeamName);

                Season season = getSeasonByYear(year);

                Category category = isWeekEnd(gameDate) ?
                        getCategoryById(2) : getCategoryById(1);


                Game game = Game.builder()
                        .homeTeam(homeTeam)
                        .awayTeam(awayTeam)
                        .season(season)
                        .category(category)
                        .gameDate(gameDate)
                        .startTime(startTime)
                        .createdAt(currentDateTime)
                        .updatedAt(currentDateTime)
                        .isFinished(!gameDate.isAfter(currentDateTime.toLocalDate()))
                        .homeScore(0)
                        .awayScore(0)
                        .build();

                gameRepository.save(game);
            }

        } catch (IOException e) {
            throw new CustomException(INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public void setupPostSeasonGamePlan(MultipartFile file, Integer year, String type) {
        LocalDateTime currentDateTime = LocalDateTime.now();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
             CSVParser csvParser = CSVFormat.EXCEL.builder()
                     .setHeader()
                     .build()
                     .parse(reader)
        ) {
            for (CSVRecord record : csvParser) {

                String date = record.get("date");
                String time = record.get("time");

                LocalDate gameDate = parseDate(year, date);
                LocalTime startTime = LocalTime.parse(time);

                String homeTeamName = record.get("home_team");
                String awayTeamName = record.get("away_team");

                Team homeTeam = getTeamByName(homeTeamName);
                Team awayTeam = getTeamByName(awayTeamName);

                Season season = getSeasonByYear(year);

                Category category = switch (type) {
                    case "wild-card" -> getCategoryById(3);
                    case "semi-playoff" -> getCategoryById(4);
                    case "playoff" -> getCategoryById(5);
                    case "k-series" -> getCategoryById(6);
                    case "all-stars" -> getCategoryById(7);
                    default -> throw new CustomException(BAD_REQUEST);
                };

                Game game = Game.builder()
                        .homeTeam(homeTeam)
                        .awayTeam(awayTeam)
                        .season(season)
                        .category(category)
                        .gameDate(gameDate)
                        .startTime(startTime)
                        .createdAt(currentDateTime)
                        .updatedAt(currentDateTime)
                        .isFinished(!gameDate.isAfter(currentDateTime.toLocalDate()))
                        .homeScore(0)
                        .awayScore(0)
                        .build();

                gameRepository.save(game);
            }

        } catch (IOException e) {
            throw new CustomException(INTERNAL_SERVER_ERROR);
        }

    }

    private LocalDate parseDate(Integer year, String date) {

        String month = date.substring(0, 2);
        String day = date.substring(3, 5);
        return LocalDate.parse(year + "-" + month + "-" + day);
    }

    private boolean isWeekEnd(LocalDate date) {

        return date.getDayOfWeek().equals(SATURDAY) || date.getDayOfWeek().equals(SUNDAY);
    }

    private Category getCategoryById(Integer id) {
        return categoryRepository.findById(id).orElseThrow(() -> new CustomException(NOT_FOUND));
    }

    private Team getTeamByName(String name) {
        return teamRepository.findByName(name).orElseThrow(() -> new CustomException(NOT_FOUND));
    }

    private Season getSeasonByYear(Integer year) {
        return seasonRepository.findByYear(year).orElseThrow(() -> new CustomException(NOT_FOUND));
    }

}