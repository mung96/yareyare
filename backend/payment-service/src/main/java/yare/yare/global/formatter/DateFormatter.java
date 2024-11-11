package yare.yare.global.formatter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormatter {
    public static String convertToDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd(E)", java.util.Locale.KOREAN);

        return date.format(formatter);
    }

    public static String convertToDateTime(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd(E) HH:mm", java.util.Locale.KOREAN);

        return date.format(formatter);
    }

    public static String convertToReservationDate(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

        return date.format(formatter);
    }

    public static String calculateCancelDate(LocalDateTime date) {
        return convertToDateTime(date.minusDays(1).withHour(23).withMinute(59));
    }
}
