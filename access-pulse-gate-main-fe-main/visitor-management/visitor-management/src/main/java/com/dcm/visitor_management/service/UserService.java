package com.dcm.visitor_management.service;





import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.dcm.visitor_management.dto.UserLoginRequest;
import com.dcm.visitor_management.dto.UserLoginResponse;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.helper.JwtUtil;
import com.dcm.visitor_management.repository.UserRepository;
import com.dcm.visitor_management.util.EncryptionUtils;

// @Service
// public class UserService {

//     private final UserRepository userRepository;
//     private final JwtUtil jwtUtil;

//     public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
//         this.userRepository = userRepository;
//         this.jwtUtil = jwtUtil;
//     }

//     public UserLoginResponse login(UserLoginRequest request, HttpSession session) {

//         // 1️⃣ Validate captcha
//         String sessionCaptcha = (String) session.getAttribute("captcha");


//     System.out.println("Session Captcha = " + sessionCaptcha);
//     System.out.println("Request Captcha = " + request.getCaptcha());


//         if (sessionCaptcha == null) {
//             return new UserLoginResponse("Captcha expired, please refresh", null, null, null, null);
//         }

//         if (request.getCaptcha() == null ||
//             !request.getCaptcha().equalsIgnoreCase(sessionCaptcha)) {
//             return new UserLoginResponse("Invalid captcha", null, null, null, null);
//         }

//         session.removeAttribute("captcha");



//         // 2️⃣ Decrypt password
//         String decryptedPassword;
//         try {
//             decryptedPassword = EncryptionUtils.decrypt1(request.getPassword());
//         } catch (Exception e) {
//             return new UserLoginResponse("Invalid encrypted password", null, null, null, null);
//         }

//         // 3️⃣ Validate user
//         UserEntity user = userRepository.findByMobile(request.getMobile()).orElse(null);
//         if (user == null) {
//             return new UserLoginResponse("Invalid username or password", null, null, null, null);
//         }

//         // Support static password or DB stored password
//         if (!"1234".equals(decryptedPassword) &&
//             !decryptedPassword.equals(user.getPassword())) {
//             return new UserLoginResponse("Invalid username or password", null, null, null, null);
//         }

//         // 4️⃣ Generate JWT with mobilenumber
//         String token = jwtUtil.generateToken(user.getMobile());
//         System.out.println("Generated Token = " + token);

//             // ✅ IMPORTANT: STORE IN SESSION
//     session.setAttribute("ROLE", "ROLE_USER");
//     session.setAttribute("USERNAME", user.getName());

//     System.out.println("SESSION ROLE = " + session.getAttribute("ROLE"));
//     System.out.println("SESSION USER = " + session.getAttribute("USERNAME"));

//         return new UserLoginResponse(
//                 "Login successful",
//                 token,
//                 user.getName(),
//                 user.getMobile(),
//                 user.getRole()
//         );

//     }


//     public UserLoginResponse findByUsername(String username) {
//         UserEntity user = userRepository.findByName(username).orElse(null);
//         if (user == null) return null;

//         return new UserLoginResponse(
//                 "Login successful",
//                 null,
//                 user.getName(),
//                 user.getMobile(),
//                 user.getRole()
//         );
//     }
// }




@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public UserLoginResponse login(UserLoginRequest request, HttpSession session) {

        // // CAPTCHA VALIDATION (service-level)
        // String sessionCaptcha = (String) session.getAttribute("captcha");

        // if (sessionCaptcha == null) {
        //     return new UserLoginResponse("Captcha expired", null, null, null, null);
        // }

        // if (request.getCaptcha() == null ||
        //     !request.getCaptcha().equalsIgnoreCase(sessionCaptcha)) {
        //     return new UserLoginResponse("Invalid captcha", null, null, null, null);
        // }

        // session.removeAttribute("captcha");

        // PASSWORD DECRYPT
        String decryptedPassword;
        try {
            decryptedPassword = EncryptionUtils.decrypt1(request.getPassword());
        } catch (Exception e) {
            return new UserLoginResponse("Invalid password", null, null, null, null);
        }

        // USER VALIDATION
        UserEntity user = userRepository.findByMobile(request.getMobile()).orElse(null);
        if (user == null) {
            return new UserLoginResponse("Invalid username or password", null, null, null, null);
        }

        if (!"1234".equals(decryptedPassword) &&
            !decryptedPassword.equals(user.getPassword())) {
            return new UserLoginResponse("Invalid username or password", null, null, null, null);
        }

        // JWT
        String token = jwtUtil.generateToken(user.getMobile());

        session.setAttribute("ROLE", "ROLE_USER");
        session.setAttribute("USERNAME", user.getName());

        return new UserLoginResponse(
                "SUCCESS",
                token,
                user.getName(),
                user.getMobile(),
                user.getRole()
        );
    }
}
