package com.dcm.visitor_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dcm.visitor_management.dto.CreateUserRequest;
import com.dcm.visitor_management.dto.UpdateUserRequest;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.repository.UserRepository;

@Service
public class AddUser {
      @Autowired
    private UserRepository userRepository;


    public UserEntity createUser(CreateUserRequest req, String empCode) {

        if (userRepository.existsByMobile(req.getMobile())) {
    throw new RuntimeException("Mobile already exists");
}

        UserEntity user = new UserEntity();

        user.setName(req.getName());
        user.setMobile(req.getMobile());

        // 🔥 username = mobile
        user.setUsername(req.getMobile());
  
         user.setPassword(req.getPassword());


        // 🔒 static role
        user.setRole("user");

        // 🔥 creator employee emp_code
        user.setEmployeeCode(empCode);

        return userRepository.save(user);
    }



    public UserEntity updateUserByMobile(String mobile, UpdateUserRequest req) {
        UserEntity user = userRepository.findByMobile(mobile)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (req.getName() != null && !req.getName().isEmpty()) {
            user.setName(req.getName());
        }

        if (req.getPassword() != null && !req.getPassword().isEmpty()) {
            user.setPassword((req.getPassword()));
        }

        return userRepository.save(user);
    }
}

