package com.dcm.visitor_management.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dcm.visitor_management.dto.UserResponse;
import com.dcm.visitor_management.repository.UserRepository;

@Service
public class UserInfoshow {

    private final UserRepository userRepository;

    public UserInfoshow(UserRepository userRepository) { // ✅ SAME NAME
        this.userRepository = userRepository;
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
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
