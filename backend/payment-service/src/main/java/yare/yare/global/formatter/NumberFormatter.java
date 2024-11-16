package yare.yare.global.formatter;

import java.text.NumberFormat;
import java.util.Locale;

public class NumberFormatter {
    public static String convertPriceFormat(Integer price) {
        return NumberFormat.getNumberInstance(Locale.KOREA).format(price);
    }
}
