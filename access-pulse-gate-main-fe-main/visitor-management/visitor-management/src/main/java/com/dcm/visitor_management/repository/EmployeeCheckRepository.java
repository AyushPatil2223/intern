package com.dcm.visitor_management.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dcm.visitor_management.entity.Employeecheck;

@Repository
public interface EmployeeCheckRepository extends JpaRepository<Employeecheck, String> {

    Optional<Employeecheck> findByEmpCode(String empCode);
}

