package com.dcm.visitor_management.dto;

public class UserLoginResponse {
    private String status;
    private String token;
    private String username;
    private String mobile;
    private String role;

    // No-args constructor
    public UserLoginResponse() {
    }

    // All-args constructor
    public UserLoginResponse(String status, String token, String username, String mobile, String role) {
        this.status = status;
        this.token = token;
        this.username = username;
        this.mobile = mobile;
        this.role = role;
    }

    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
