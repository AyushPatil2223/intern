// package com.dcm.visitor_management.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.dcm.visitor_management.dto.EmployeeLoginRequest;
// import com.dcm.visitor_management.service.EmployeeAuthService;

// @RestController
// @RequestMapping("/auth")

// public class EmployeeAuthController  {
//     @Autowired
//     private EmployeeAuthService authService;

    
//     @PostMapping("/login")
//     public ResponseEntity<String> login(@RequestBody EmployeeLoginRequest request) {
//         return ResponseEntity.ok(authService.login(request));
//     }

// }
