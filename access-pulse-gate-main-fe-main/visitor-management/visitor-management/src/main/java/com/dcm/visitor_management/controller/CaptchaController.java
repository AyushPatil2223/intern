package com.dcm.visitor_management.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.visitor_management.util.CaptchaUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/captcha")
public class CaptchaController {

    @Autowired
    private CaptchaUtil captchaUtil;
    private static final Logger logger = LoggerFactory.getLogger(CaptchaController.class);

    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generateCaptcha(HttpSession session) throws IOException {
        String captchaText = captchaUtil.generateCaptchaText();
        session.setAttribute("captcha", captchaText); // store in session
        logger.info("Generated Captcha: " + captchaText);
        logger.info("Session ID (Captcha API) = " + session.getId());
        logger.info("Generated Captcha: {}", captchaText);
        System.out.println("CAPTCHA: " + captchaText);
System.out.println("SESSION ID: " + session.getId());

        BufferedImage image = captchaUtil.generateCaptchaImage(captchaText);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        String base64Image = Base64.getEncoder().encodeToString(baos.toByteArray());

        Map<String, String> response = new HashMap<>();
        response.put("captchaImage", "data:image/png;base64," + base64Image);

        return ResponseEntity.ok(response);
    }
}

