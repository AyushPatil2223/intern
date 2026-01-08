package com.dcm.visitor_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dcm.visitor_management.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByMobile(String mobile);

    Optional<UserEntity> findByName(String name);

    
    boolean existsByMobile(String mobile);

  



}