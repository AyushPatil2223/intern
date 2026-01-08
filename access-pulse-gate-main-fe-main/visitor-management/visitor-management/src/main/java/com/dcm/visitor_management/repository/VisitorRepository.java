package com.dcm.visitor_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dcm.visitor_management.entity.VisitorEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VisitorRepository extends JpaRepository<VisitorEntity, Long> {
    
    List<VisitorEntity> findByHost(String host );

    long countByVisitDate(LocalDate date);

    Optional<VisitorEntity> findTopByMobileNumberOrderByIdDesc(String mobileNumber);


    @Query("SELECT COUNT(v) FROM VisitorEntity v WHERE YEAR(v.visitDate) = :year AND MONTH(v.visitDate) = :month")
    long countByMonth(@Param("year") int year, @Param("month") int month);


}
