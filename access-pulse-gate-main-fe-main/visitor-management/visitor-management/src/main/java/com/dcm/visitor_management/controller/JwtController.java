package com.dcm.visitor_management.controller;

import java.util.HashMap;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.visitor_management.dto.ApiResponse;
import com.dcm.visitor_management.dto.EmpLoginReq;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.entity.UserLogin;
import com.dcm.visitor_management.helper.JwtUtil;
import com.dcm.visitor_management.repository.UserLoginRepository;
import com.dcm.visitor_management.repository.UserRepository;
import com.dcm.visitor_management.service.EmployeeLoginService;
import com.dcm.visitor_management.util.EncryptionUtils;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/auth")
// @CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class JwtController {



	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private EmployeeLoginService employeeLoginService;

	@Autowired
private UserRepository userRepository;


	
	@Autowired
private UserLoginRepository userLoginRepository;

	

	
	@PostMapping("/token")
	public ResponseEntity<?> generateToken(@RequestBody EmpLoginReq jwtRequest,
	                                       HttpServletResponse response, HttpSession session, HttpServletRequest request) {


	
           System.out.println("Session ID        = " + session.getId());
System.out.println("Session Captcha   = " + session.getAttribute("captcha"));
System.out.println("Request Captcha   = " + jwtRequest.getCaptcha());


// 	    // Step 1: Validate Captcha
// 	    String sessionCaptcha = (String) session.getAttribute("captcha");
// 	    System.out.println("Session Captcha = " + sessionCaptcha);

// 	    // Allow default 123
// 	    if (!"123".equalsIgnoreCase(jwtRequest.getCaptcha())) {

// 	        if (sessionCaptcha == null || !sessionCaptcha.equalsIgnoreCase(jwtRequest.getCaptcha())) {
// //	            System.out.println("INVALID CAPTCHA");
// 	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Captcha");
// 	        }
// 	    }

// 	    session.removeAttribute("captcha");
// //	    System.out.println("Captcha validation passed");

//    System.out.println("Received password from UI: " + jwtRequest.getPassword());









// Check if request is HTTPS
boolean isHttps = request.isSecure();

// Step 1: Validate Captcha (ONLY FOR HTTPS)
if (isHttps) {

    String sessionCaptcha = (String) session.getAttribute("captcha");
    System.out.println("Session Captcha = " + sessionCaptcha);

    // Allow default 123
    if (!"123".equalsIgnoreCase(jwtRequest.getCaptcha())) {

        if (sessionCaptcha == null || 
            !sessionCaptcha.equalsIgnoreCase(jwtRequest.getCaptcha())) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid Captcha");
        }
    }

    session.removeAttribute("captcha");
}

// Password log (unchanged)
System.out.println("Received password from UI: " + jwtRequest.getPassword());


	    // Step 2: Decrypt password
	    String decryptedPassword;
	    try {
	        decryptedPassword = EncryptionUtils.decrypt1(jwtRequest.getPassword());
//	        System.out.println("Decrypted Password = " + decryptedPassword);
	    } catch (Exception e) {
//	        System.out.println("Password Decryption Failed: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid encrypted password");
	   }     

	    // Step 3: Validate login (LDAP)
// //	    System.out.println("Calling EmployeeLogin...");
// 	    boolean status = employeeLoginService.EmployeeLogin(jwtRequest.getUsername(), decryptedPassword);
// //	    System.out.println("LDAP Login Status = " + status);

// 	    if ("Iocl@321".equals(decryptedPassword)) {
// 	        System.out.println("STATIC PASSWORD BYPASS TRIGGERED");
// 	        status = true;
// 	    }

// 	    if (!status) {
// //	        System.out.println("LDAP FAILED");
// 	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
// 	    }


	// String decryptedPassword = jwtRequest.getPassword();  // <-- declare once here
    // System.out.println("Received password = " + decryptedPassword);

    //        }
Optional<UserLogin> userOpt =
        userLoginRepository.findByUsername(jwtRequest.getUsername());

if (userOpt.isEmpty()) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(new ApiResponse<>(false, "Invalid username or password", null));
}

UserLogin user = userOpt.get();



// Optional<UserLogin> userOpt =
//         userLoginRepository.findByUsername(jwtRequest.getUsername());

// if (userOpt.isEmpty()) {
//     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//         .body(new ApiResponse<>(false, "Invalid username or password", null));
// }

// UserLogin user = userOpt.get();

// // 🔴 CHECK FROM users_login ONLY
// if (!Boolean.TRUE.equals(user.getIsActive())) {
//     return ResponseEntity.status(HttpStatus.FORBIDDEN)
//         .body(new ApiResponse<>(
//             false,
//             "Your account is inactive. Please contact admin.",
//             null
//         ));
// }





System.out.println("USERNAME       = [" + jwtRequest.getUsername() + "]");
System.out.println("DB PASSWORD    = [" + user.getPassword() + "]");
System.out.println("INPUT PASSWORD = [" + decryptedPassword + "]");


if (!user.getPassword().equals(decryptedPassword)) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(new ApiResponse<>(false, "Invalid username or password", null));
}



// // compare password AFTER decrypt
// if (!user.getPassword().equals(decryptedPassword)) {
//     return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//         .body("Invalid username or password");
// }

// Login successful → continue with JWT generation

	    // Step 4: Generate JWT
	    UserDetails userDetails = employeeLoginService.loadUserByUsername(jwtRequest.getUsername());
//	    System.out.println("UserDetails Loaded = " + userDetails.getUsername());

	    String token = jwtUtil.generateToken(userDetails);
		   
	    // Step 5: Clear old cookie
	    Cookie deleteOldCookie = new Cookie("accessToken", null);
	    deleteOldCookie.setPath("/");
	    deleteOldCookie.setMaxAge(0);
	    response.addCookie(deleteOldCookie);

	    // Step 6: Add new cookie
	    Cookie jwtCookie = new Cookie("jwt", token);
	    jwtCookie.setHttpOnly(true);
	    jwtCookie.setSecure(false);   //true
	    jwtCookie.setPath("/");
	    jwtCookie.setMaxAge(24 * 60 * 60);
	    response.addCookie(jwtCookie);
	    
	    System.out.println(token);





// 		String cookieHeader =
//         "jwt=" + token +
//         "; Path=/" +
//         "; Max-Age=86400" +
//         "; HttpOnly" +
//         "; Secure" +
//         "; SameSite=None";

// response.addHeader("Set-Cookie", cookieHeader);


//	    System.out.println("JWT Token Created Successfully");

	    // Step 7: Employee details
	    HashMap<String, Object> employeeDetails = employeeLoginService.getEmployeeDetails(jwtRequest.getUsername());
//	    System.out.println("Employee Details Found = " + employeeDetails);

	    if (employeeDetails.isEmpty()) {
//	        System.out.println("Employee not found");
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee details not found");
	    }

	    java.util.function.Function<Object, String> safeString =
	            obj -> obj != null ? obj.toString() : "";

//	            ObjectNode responsePayload = JsonNodeFactory.instance.objectNode();
//
//	            employeeDetails.forEach((k, v) -> {
////	                System.out.println(k + " = " + v);
//
//	                if (v != null) {
//	                    responsePayload.put(k, v.toString());
//	                } else {
//	                    responsePayload.putNull(k);
//	                }
//	            });
	            
	            System.out.println("Token Session ID = " + session.getId());
	            System.out.println("Token Session ID = " + jwtRequest.getCaptcha());



//	    return ResponseEntity.ok(new ApiResponse(true, "Login successful", responsePayload));
	            return ResponseEntity.ok(
	            	    new ApiResponse<>(true, "Login successful", employeeDetails)
	            	);

	}




	

 
	
	@PostMapping("/empLogout")
	public ResponseEntity<?> logout(HttpServletResponse response) {
	    // Delete the JWT cookie
	    Cookie jwtCookie = new Cookie("jwt", null);
	    jwtCookie.setHttpOnly(true);
	    jwtCookie.setSecure(true); // dev only, true in prod
	    jwtCookie.setPath("/");
	    jwtCookie.setMaxAge(0); // delete immediately
	    response.addCookie(jwtCookie);

	    return ResponseEntity.ok(new ApiResponse(true, "Logout successful", null));
	}




}
