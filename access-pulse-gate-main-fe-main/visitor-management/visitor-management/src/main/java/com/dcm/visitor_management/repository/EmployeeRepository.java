package com.dcm.visitor_management.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dcm.visitor_management.entity.EmployeeEntity;

@Repository
// public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Integer> {
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, String> {

    Optional<EmployeeEntity> findByEmpCode(String emp_code);
}
