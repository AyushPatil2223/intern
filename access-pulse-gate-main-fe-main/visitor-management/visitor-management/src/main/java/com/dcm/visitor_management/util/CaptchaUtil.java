package com.dcm.visitor_management.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class CaptchaUtil {

    private static final String CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
    private static final int CAPTCHA_LENGTH = 5;

    public String generateCaptchaText() {
        Random random = new Random();
        StringBuilder captchaStr = new StringBuilder(CAPTCHA_LENGTH);

        for (int i = 0; i < CAPTCHA_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            captchaStr.append(CHARACTERS.charAt(index));
        }

        return captchaStr.toString();
    }

    public BufferedImage generateCaptchaImage(String captchaText) {
        int width = 180;
        int height = 60;

        BufferedImage bufferedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = bufferedImage.createGraphics();

        // smoother edges for text/lines
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // background
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, width, height);

        // font setup
        Font font = new Font("Arial", Font.BOLD, 40);
        g2d.setFont(font);

        Random random = new Random();
        int x = 20;
        for (char c : captchaText.toCharArray()) {
            // random color for each character
            g2d.setColor(new Color(random.nextInt(150), random.nextInt(150), random.nextInt(150)));

            // apply slight rotation for each character
            int angle = random.nextInt(21) - 10; // -10 to +10 degrees
            g2d.rotate(Math.toRadians(angle), x, 40);

            g2d.drawString(String.valueOf(c), x, 45);

            // reset rotation
            g2d.rotate(-Math.toRadians(angle), x, 40);

            x += 30; // spacing between letters
        }

        // draw noise lines
        g2d.setColor(Color.GRAY);
        for (int i = 0; i < 3; i++) {
            int x1 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int x2 = random.nextInt(width);
            int y2 = random.nextInt(height);
            g2d.drawLine(x1, y1, x2, y2);
        }

        // add some noise curves
        g2d.setColor(new Color(200, 200, 200));
        for (int i = 0; i < 2; i++) {
            int ctrlx = random.nextInt(width);
            int ctrly = random.nextInt(height);
            g2d.drawArc(ctrlx, ctrly, 40, 40, random.nextInt(360), 200);
        }

        g2d.dispose();
        return bufferedImage;
    }
}

