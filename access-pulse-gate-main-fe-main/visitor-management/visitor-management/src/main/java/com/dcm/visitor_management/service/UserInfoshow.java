package com.dcm.visitor_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dcm.visitor_management.dto.UserResponse;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.entity.UserLogin;
import com.dcm.visitor_management.repository.UserLoginRepository;
import com.dcm.visitor_management.repository.UserRepository;

@Service
public class UserInfoshow {

    private final UserRepository userRepository;

     private final UserLoginRepository userLoginRepository;

    public UserInfoshow(UserRepository userRepository,
        UserLoginRepository userLoginRepository) { // ✅ SAME NAME
        this.userRepository = userRepository;
        this.userLoginRepository = userLoginRepository;
    
    }



    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> {
                    UserResponse dto = new UserResponse();
                    dto.setEmployeeCode(user.getEmployeeCode());
                    dto.setMobile(user.getMobile());
                    dto.setName(user.getName());
                    dto.setCreatedAt(user.getCreatedAt());
                    dto.setIsActive(user.getIsActive()); // ✅
                    return dto;
                })
                .collect(Collectors.toList());
    }

  
}
