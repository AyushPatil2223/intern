// package com.dcm.visitor_management.service;
// import java.io.File;

// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.time.LocalDate;
// import java.time.LocalTime;

// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import com.dcm.visitor_management.dto.VisitorRequest;
// import com.dcm.visitor_management.dto.VisitorResponse;
// import com.dcm.visitor_management.entity.UserEntity;
// import com.dcm.visitor_management.entity.VisitorEntity;
// import com.dcm.visitor_management.repository.VisitorRepository;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;

// import org.springframework.lang.NonNull;
// import org.springframework.security.core.context.SecurityContextHolder;

// import java.util.ArrayList;
// import java.util.List;

// @Service
// public class VisitorService {

//     private final VisitorRepository visitorRepository;

//     public VisitorService(VisitorRepository visitorRepository) {
//         this.visitorRepository = visitorRepository;
//     }

//     public VisitorEntity addVisitor(VisitorRequest request) throws Exception {

// String photoUrl = null;

//     MultipartFile photo = request.getPhoto();
//     if (photo != null && !photo.isEmpty()) {
//         // Folder to save photos
//         String uploadDir = Paths.get("visitor-photos").toAbsolutePath().toString();
// Path uploadPath = Paths.get(uploadDir);
// if (!Files.exists(uploadPath)) {
//     Files.createDirectories(uploadPath);
// }


//         // Save file
//         String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
//         Path filePath = uploadPath.resolve(fileName);
// File destFile = filePath.toFile(); // no @NonNull needed
// photo.transferTo(destFile);

//         // Save relative URL
//         photoUrl = "/visitor-photos/" + fileName;
//     }


//         VisitorEntity visitor = new VisitorEntity(
//                 request.getName(),
//                 request.getGender(),
//                 request.getMobile(),
//                 request.getCompany(),
//                 request.getEmail(),
//                 request.getHost(),
//                 LocalDate.now(),
//                 LocalTime.now(),
//                 photoUrl
//         );

//         return visitorRepository.save(visitor);
//     }

    
//     // ✅ GET ALL VISITORS
//     public List<VisitorEntity> getAllVisitors() {
//         return visitorRepository.findAll();
//     }

// //     // ✅ GET VISITORS BASED ON ROLE
// // public List<VisitorEntity> getAllVisitors() {

// //     Authentication auth = SecurityContextHolder.getContext().getAuthentication();
// //     String loggedInUsername = auth.getName(); // logged-in user

// //     boolean isEmployee = auth.getAuthorities().stream()
// //             .anyMatch(a -> a.getAuthority().equals("ROLE_EMPLOYEE"));

// //     if (isEmployee) {
// //         // EMPLOYEE → see all visitors
// //         return visitorRepository.findAll();
// //     } else {
// //         // USER → see only their visitors
// //         return visitorRepository.findByHost(loggedInUsername);
// //     }
// // }


//         // Map to DTO
//         List<VisitorResponse> visitorResponses = new ArrayList<>();
// for (VisitorEntity visitor : visitors) {
//     VisitorResponse dto = new VisitorResponse();
//     dto.setId(visitor.getId());
//     dto.setFullName(visitor.getFullName());
//     dto.setMobileNumber(visitor.getMobileNumber());
//     dto.setCompanyName(visitor.getCompanyName());
//     dto.setGender(visitor.getGender());
//     dto.setEmailId(visitor.getEmailId());
//     dto.setPhotoUrl(visitor.getPhotoUrl());
//     dto.setHost(visitor.getHost());

//     UserEntity hostUser = userRepository.findByMobile(visitor.getHost()).orElse(null);
//     dto.setHostName(hostUser != null ? hostUser.getName() : visitor.getHost());

//     visitorResponses.add(dto);
// }

// return visitorResponses;

//     }


// }




package com.dcm.visitor_management.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.io.IOException; // ✅ CORRECT




import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dcm.visitor_management.dto.VisitorRequest;
import com.dcm.visitor_management.dto.VisitorResponse;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.entity.VisitorEntity;
import com.dcm.visitor_management.repository.UserRepository;
import com.dcm.visitor_management.repository.VisitorRepository;


@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;
    private final UserRepository userRepository;

    public VisitorService(VisitorRepository visitorRepository, UserRepository userRepository) {
        this.visitorRepository = visitorRepository;
        this.userRepository = userRepository;
    }

//     public VisitorEntity addVisitor(VisitorRequest request) throws Exception {

//         // String photoUrl = null;

//         private String photo;  

//         // MultipartFile photo = request.getPhoto();
//         // if (photo != null && !photo.isEmpty()) {
//         //     String uploadDir = Paths.get("visitor-photos").toAbsolutePath().toString();
//         //     Path uploadPath = Paths.get(uploadDir);
//         //     if (!Files.exists(uploadPath)) {
//         //         Files.createDirectories(uploadPath);
//         //     }


//         MultipartFile photoFile = request.getPhoto();
// if (photoFile != null && !photoFile.isEmpty()) {
//     visitor.setPhoto(photoFile.getBytes()); // save bytes to DB
// }


//             String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
//             Path filePath = uploadPath.resolve(fileName);
//             File destFile = filePath.toFile();
//             photo.transferTo(destFile);

//             photoUrl = "/visitor-photos/" + fileName;
//         }

//         VisitorEntity visitor = new VisitorEntity();

// visitor.setFullName(request.getName());
// visitor.setGender(request.getGender());
// visitor.setMobileNumber(request.getMobile());
// visitor.setCompanyName(request.getCompany());
// visitor.setEmailId(request.getEmail());
// visitor.setHost(request.getHost());
// visitor.setVisitDate(LocalDate.now());
// visitor.setVisitTime(LocalTime.now());
// visitor.setPhotoUrl(photoUrl);
// visitor.setPunchOutTime(null); // optional, default is null

// return visitorRepository.save(visitor);
//     }


public VisitorEntity addVisitor(VisitorRequest request) throws IOException {
    VisitorEntity visitor = new VisitorEntity();
    
    visitor.setFullName(request.getName());
    visitor.setGender(request.getGender());
    visitor.setMobileNumber(request.getMobile());
    visitor.setCompanyName(request.getCompany());
    visitor.setEmailId(request.getEmail());
    visitor.setHost(request.getHost());
    visitor.setVisitDate(LocalDate.now());
    visitor.setVisitTime(LocalTime.now());
    visitor.setPurposeOfVisit(request.getPurposeOfVisit());


     

    MultipartFile photoFile = request.getPhoto();
if (photoFile != null && !photoFile.isEmpty()) {
    try {
        visitor.setPhoto(photoFile.getBytes());
    } catch (IOException e) {
        throw new RuntimeException("Failed to store photo", e);
    }
}


    visitor.setPunchOutTime(null); // optional


    
    return visitorRepository.save(visitor);
}


    public List<VisitorResponse> getAllVisitorsForUser() {
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // String identifier = auth.getName(); // logged-in user's mobile or emp code

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

if (auth == null || auth.getName() == null) {
    throw new RuntimeException("Unauthenticated request");
}

String identifier = auth.getName();


        List<VisitorEntity> visitors;

        if (identifier != null && identifier.matches("\\d{8}")) {
            // Employee → see all visitors
            visitors = visitorRepository.findAll();
        } else {
            // User → see only visitors created by this user
            visitors = visitorRepository.findByHost(identifier);
        }

        // Map to DTO
        List<VisitorResponse> visitorResponses = new ArrayList<>();
        for (VisitorEntity visitor : visitors) {
            VisitorResponse dto = new VisitorResponse();
            dto.setId(visitor.getId());
            dto.setFullName(visitor.getFullName());
            dto.setMobileNumber(visitor.getMobileNumber());
            dto.setCompanyName(visitor.getCompanyName());
            dto.setGender(visitor.getGender());
            dto.setEmailId(visitor.getEmailId());
            dto.setPhoto(visitor.getPhotoBase64());
            dto.setHost(visitor.getHost());
            dto.setvisitDate(visitor.getVisitDate().toString()); // format: "2025-12-30"
            dto.setvisitTime(visitor.getVisitTime().toString());
            dto.setPurposeOfVisit(visitor.getPurposeOfVisit());


            
if (visitor.getPunchOutTime() != null) {
    dto.setpunchOutDateTime(visitor.getPunchOutTime().toString());
} else {
    dto.setpunchOutDateTime(null);
}



            // Convert host number → host name for frontend
            UserEntity hostUser = userRepository.findByMobile(visitor.getHost()).orElse(null);
            dto.setHostName(hostUser != null ? hostUser.getName() : visitor.getHost());

            visitorResponses.add(dto);
        }

        return visitorResponses;
    }



    public VisitorEntity punchOutVisitor(Long visitorId) {

    VisitorEntity visitor = visitorRepository.findById(visitorId)
            .orElseThrow(() -> new RuntimeException("Visitor not found"));

    // prevent double punch-out
    if (visitor.getPunchOutTime() != null) {
        throw new RuntimeException("Visitor already punched out");
    }

    visitor.setPunchOutTime(LocalDateTime.now());
    return visitorRepository.save(visitor);
}

}

