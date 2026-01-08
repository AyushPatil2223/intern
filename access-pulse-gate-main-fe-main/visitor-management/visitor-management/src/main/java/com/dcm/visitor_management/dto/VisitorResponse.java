package com.dcm.visitor_management.dto;

public class VisitorResponse {

    private Long id;
    private String fullName;
    private String gender;
    private String mobileNumber;
    private String companyName;
    private String emailId;
    private String host;      // backend host number
    private String hostName;  // frontend display name
    private String photo;
    private String visitDate; // or LocalDate, but string is easier for frontend
    private String visitTime;
    private String punchOutDateTime;
    private String purposeOfVisit;


    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    public String getHostName() { return hostName; }
    public void setHostName(String hostName) { this.hostName = hostName; }

    public String getPhoto() { return photo; }
public void setPhoto(String photo) { this.photo = photo; }

    public String getvisitDate() { return visitDate; }
    public void setvisitDate(String visitDate) { this.visitDate = visitDate; }

    public String getvisitTime() { return visitTime; }
    public void setvisitTime(String visitTime) { this.visitTime = visitTime; }

    
    public String getpunchOutDateTime() { return punchOutDateTime; }
    public void setpunchOutDateTime(String punchOutDateTime) { this.punchOutDateTime = punchOutDateTime; }

    public String getPurposeOfVisit() { return purposeOfVisit; }
public void setPurposeOfVisit(String purposeOfVisit) { this.purposeOfVisit = purposeOfVisit; }




}
