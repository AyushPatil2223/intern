package com.dcm.visitor_management.util;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class EncryptionUtils {

    private static final String ALGORITHM1 = "AES/CBC/PKCS5Padding"; // Match CryptoJS
 private static final String SECRET_KEY = "aaUIpGnapISrKsHL"; // 16 characters
 private static final String IV = "1234567890123456"; // 16 characters (same as used in Angular)




    public static String decrypt1(String encryptedText) {
        try {
            // Create SecretKeySpec and IV
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(IV.getBytes());

            // Initialize Cipher
            Cipher cipher = Cipher.getInstance(ALGORITHM1);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);

            // Decode Base64 and decrypt
            byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);
            byte[] decryptedBytes = cipher.doFinal(decodedBytes);

            return new String(decryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error while decrypting", e);
        }
    }
}