package com.dcm.visitor_management.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dcm.visitor_management.dto.ApiResponse;
import com.dcm.visitor_management.dto.CreateUserRequest;
import com.dcm.visitor_management.dto.UpdateUserRequest;
import com.dcm.visitor_management.dto.UserResponse;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.entity.VisitorEntity;
import com.dcm.visitor_management.repository.UserRepository;
import com.dcm.visitor_management.service.AddUser;
import com.dcm.visitor_management.service.UserInfoshow;


@RestController
@RequestMapping("/auth")
public class AddUserController {

    @Autowired
    private AddUser adduser;

    @Autowired
    private UserInfoshow userInfoshow;

    @Autowired
private UserRepository userRepository;


    


// @PostMapping("/users")
// public ResponseEntity<?> createUser(@RequestBody CreateUserRequest request, Principal principal) {
//     // principal.getName() returns emp_code as string
//     String empCode = principal.getName(); 

//     UserEntity user = adduser.createUser(request, empCode);
//     return ResponseEntity.ok(user);
// }





@PostMapping("/users")
public ResponseEntity<?> createUser(@RequestBody CreateUserRequest request) {
    // Now empCode comes from frontend
    String empCode = request.getEmpCode();

    UserEntity user = adduser.createUser(request, empCode);
    return ResponseEntity.ok(user);
}








// @PostMapping("/users")
// public ResponseEntity<?> createUser(
//         @RequestBody CreateUserRequest request,
//         Authentication authentication) {

//     // Logged-in username from Spring Security
//     String username = authentication.getName();

//     // Fetch logged-in user correctly
//     UserEntity loggedInUser = userRepository.findByUsername(username)
//             .orElseThrow(() -> new RuntimeException("Logged-in user not found"));

//     // Correct employee code from DB
//     String empCode = loggedInUser.getEmployeeCode();

//     // Create user with correct emp_code
//     UserEntity user = adduser.createUser(request, empCode);

//     return ResponseEntity.ok(user);
// }


   

    // ✅ POST = perform action
    @PostMapping("/update/{mobile}")
    public ResponseEntity<?> updateUserByMobile(
                @PathVariable String mobile,

            @RequestBody UpdateUserRequest request) {

        UserEntity updatedUser = adduser.updateUserByMobile(mobile,request);
        return ResponseEntity.ok(updatedUser);
    }

        @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userInfoshow.getAllUsers());
    }



 


}


