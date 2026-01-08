package com.dcm.visitor_management.entity;

import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "users", schema = "suraksha")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    private String employeeCode;

    @Column(nullable = false, unique = true)
    private String mobile;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String username; // Added for login

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

        @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }


         public UserEntity() {
    }

    // All-arguments constructor
    public UserEntity(Long id, LocalDateTime createdAt, String employeeCode, String mobile,
                      String name, String username, String password, String role) {
        this.id = id;
        this.createdAt = createdAt;
        this.employeeCode = employeeCode;
        this.mobile = mobile;
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
    }


    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
