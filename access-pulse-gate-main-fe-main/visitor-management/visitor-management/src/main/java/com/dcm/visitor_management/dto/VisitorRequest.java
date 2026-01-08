// package com.dcm.visitor_management.dto;

// import org.springframework.web.multipart.MultipartFile;

// public class VisitorRequest {

//     private String name;
//     private String gender;
//     private String mobile;
//     private String company;
//     private String email;
//     private String host;
//  private String hostName;
//     private MultipartFile photo;

    

//     // Getter and Setter for name
//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     // Getter and Setter for gender
//     public String getGender() {
//         return gender;
//     }

//     public void setGender(String gender) {
//         this.gender = gender;
//     }

//     // Getter and Setter for mobile
//     public String getMobile() {
//         return mobile;
//     }

//     public void setMobile(String mobile) {
//         this.mobile = mobile;
//     }

//     // Getter and Setter for company
//     public String getCompany() {
//         return company;
//     }

//     public void setCompany(String company) {
//         this.company = company;
//     }

//     // Getter and Setter for email
//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     // Getter and Setter for host
//     public String getHost() {
//         return host;
//     }

//     public void setHost(String hostName) {
//         this.hostName = hostName;
//     }

//      public String gethostName() {
//         return host;
//     }

//     public void sethostName(String hostName) {
//         this.hostName = hostName;
//     }


//     public MultipartFile getPhoto() {
//     return photo;
// }

// public void setPhoto(MultipartFile photo) {
//     this.photo = photo;
// }

// }


package com.dcm.visitor_management.dto;

import org.springframework.web.multipart.MultipartFile;

public class VisitorRequest {

    private String name;
    private String gender;
    private String mobile;
    private String company;
    private String email;
    private String host;      // store host number
    
    private MultipartFile photo;
    private String purposeOfVisit;


    // Getter and Setter for name
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    // Getter and Setter for gender
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    // Getter and Setter for mobile
    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    // Getter and Setter for company
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    // Getter and Setter for email
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // Getter and Setter for host (number)
    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    // Getter and Setter for hostName (for frontend display)
    

    // Getter and Setter for photo
    public MultipartFile getPhoto() { return photo; }
    public void setPhoto(MultipartFile photo) { this.photo = photo; }

    public String getPurposeOfVisit() { return purposeOfVisit; }
public void setPurposeOfVisit(String purposeOfVisit) { this.purposeOfVisit = purposeOfVisit; }

}

