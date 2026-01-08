// package com.dcm.visitor_management.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.dcm.visitor_management.dto.EmployeeLoginRequest;

// import com.dcm.visitor_management.entity.EmployeeLogin;
// import com.dcm.visitor_management.repository.EmployeeLoginRepository;

// @Service
// public class EmployeeAuthService  {
//         @Autowired
//     private EmployeeLoginRepository loginRepository;

//     public String login(EmployeeLoginRequest request) {

//         EmployeeLogin login = loginRepository
//                 .findByUsername(request.getUsername())
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         // Plain password comparison
//         if (!request.getPassword().equals(login.getPassword())) {
//             throw new RuntimeException("Invalid password");
//         }

//         return "Login Successful";
//     }


// }
