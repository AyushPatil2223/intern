package com.dcm.visitor_management.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Base64;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

// import org.springframework.web.multipart.MultipartFile;

// import io.jsonwebtoken.io.IOException;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitors" , schema = "suraksha")
public class VisitorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String gender;
    private String mobileNumber;
    private String companyName;
    private String emailId;
    private String host;
    private LocalDate visitDate;
    private LocalTime visitTime;

    @Column(name = "purpose_of_visit")
private String purposeOfVisit;

    
    // @Column(name = "photo_url")
    // private String photoUrl;

@JsonIgnore
@Column(name = "photo")

private byte[] photo;


    @Column(name = "punch_out_time" )
    private LocalDateTime punchOutTime;



    // Default Constructor
    public VisitorEntity() {
    }

    // Parameterized Constructor
    public VisitorEntity(String fullName, String gender, String mobileNumber,
                         String companyName, String emailId, String host,
                         LocalDate visitDate, LocalTime visitTime, byte[] photo, LocalDateTime punchOutTime, String purposeOfVisit) {
        this.fullName = fullName;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.companyName = companyName;
        this.emailId = emailId;
        this.host = host;
        this.visitDate = visitDate;
        this.visitTime = visitTime;
        this.photo = photo;
        this.punchOutTime = punchOutTime;
        this.purposeOfVisit = purposeOfVisit;

    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public LocalTime getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(LocalTime visitTime) {
        this.visitTime = visitTime;
    }

    
public byte[] getPhoto() {
    return photo;
}

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }


    public LocalDateTime getPunchOutTime() {
        return punchOutTime;
    }

    public void setPunchOutTime(LocalDateTime punchOutTime) {
        this.punchOutTime = punchOutTime;
    }


    public String getPhotoBase64() {
    return photo != null ? Base64.getEncoder().encodeToString(photo) : null;
}


public String getPurposeOfVisit() {
    return purposeOfVisit;
}

public void setPurposeOfVisit(String purposeOfVisit) {
    this.purposeOfVisit = purposeOfVisit;
}






}
