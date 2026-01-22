package com.dcm.visitor_management.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.visitor_management.dto.ApiResponse;
import com.dcm.visitor_management.dto.UserLoginRequest;
import com.dcm.visitor_management.dto.UserLoginResponse;
import com.dcm.visitor_management.service.UserService;



// @RestController
// @RequestMapping("/auth")
// @CrossOrigin(originPatterns = "*", allowCredentials = "true")
// public class UserAuthController {

//     @Autowired
//     private UserService userService;

//     @PostMapping("/userLogin")
//     public ResponseEntity<UserLoginResponse> login(
//             @RequestBody UserLoginRequest request,
//             HttpServletResponse servletResponse,
//             HttpSession session) {

//         UserLoginResponse response = userService.login(request, session);

//         if (response.getToken() != null) {

//             String cookieValue = "jwt=" + response.getToken()
//                     + "; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=" + (60 * 60);

//             servletResponse.addHeader("Set-Cookie", cookieValue);

//             return ResponseEntity.ok(
//                     new UserLoginResponse(
//                             response.getStatus(),   // status
//                             response.getToken(),   // ✔ FIXED
//                             response.getUsername(),  // username
//                             response.getMobile(),
//                             response.getRole()
//                     )
//             );
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//         }
//     }

//     @PostMapping("/userLogout")
//     public ResponseEntity<?> logout(HttpServletResponse response) {

//         Cookie cookie = new Cookie("jwt", null);
//         cookie.setHttpOnly(true);
//         cookie.setSecure(true);
//         cookie.setPath("/");
//         cookie.setMaxAge(0);
//         response.addCookie(cookie);

//         return ResponseEntity.ok(new ApiResponse(true, "Logout successful", null));
//     }
// }

@RestController
@RequestMapping("/auth")
// @CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class UserAuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/userLogin")
    public ResponseEntity<UserLoginResponse> login(
            @RequestBody UserLoginRequest request,
            HttpServletResponse response,
            HttpSession session,
            HttpServletRequest httpRequest) {

        boolean isHttps = httpRequest.isSecure();

        UserLoginResponse loginResponse = userService.login(request, session);

        // ❌ Login failed
        if (loginResponse.getToken() == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(loginResponse);
        }

        // ✅ JWT Cookie
        String cookie =
                "jwt=" + loginResponse.getToken() +
                "; HttpOnly;" +
                (isHttps ? " Secure;" : "") +
                " SameSite=None; Path=/; Max-Age=3600";

        response.addHeader("Set-Cookie", cookie);

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/userLogout")
    public ResponseEntity<?> logout(HttpServletResponse response, HttpServletRequest request) {

        boolean isHttps = request.isSecure();

        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(isHttps);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(new ApiResponse(true, "Logout successful", null));
    }
}
