package com.dcm.visitor_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dcm.visitor_management.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByMobile(String mobile);

    Optional<UserEntity> findByName(String name);

    Optional<UserEntity> findByEmployeeCode(String employeeCode);

    boolean existsByEmployeeCode(String employeeCode);

    Optional<UserEntity> findByUsername(String username);


    
    // Find user by mobile number and check if active
    Optional<UserEntity> findByMobileAndIsActiveTrue(String mobile);



    
    boolean existsByMobile(String mobile);

  



}