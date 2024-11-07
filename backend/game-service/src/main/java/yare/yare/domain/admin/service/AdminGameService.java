package yare.yare.domain.admin.service;

import org.springframework.web.multipart.MultipartFile;

public interface AdminGameService {

    void setupPennantRaceGamePlan(MultipartFile file, Integer year);

    void setupPostSeasonGamePlan(MultipartFile file, Integer year, String type);
}
