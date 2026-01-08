// package com.dcm.visitor_management.controller;


// import org.springframework.security.core.Authentication;


// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.*;

// import com.dcm.visitor_management.dto.VisitorRequest;
// import com.dcm.visitor_management.entity.VisitorEntity;
// import com.dcm.visitor_management.repository.UserRepository;
// import com.dcm.visitor_management.repository.VisitorRepository;
// // import com.dcm.visitor_management.repository.VisitorRepository;
// import com.dcm.visitor_management.service.VisitorService;

// import java.util.List;

// @RestController
// @RequestMapping("/auth")
// public class VisitorController {

//     private final VisitorService visitorService;

//     private final VisitorRepository visitorRepository;

//     private final UserRepository userRepository;

//     public VisitorController(VisitorService visitorService ) {
//         this.visitorService = visitorService;

//         // this.visitorRepository = null;
//     }

//     // @PostMapping("/visitors")
//     // public ResponseEntity<VisitorEntity> addVisitor(
//     //         @RequestBody VisitorRequest request) {

//     //     VisitorEntity savedVisitor = visitorService.addVisitor(request);
//     //     return ResponseEntity.ok(savedVisitor);
//     // }

//     @PostMapping("/visitors")
// public ResponseEntity<VisitorEntity> addVisitor(
//         @ModelAttribute VisitorRequest request) throws Exception {
//     VisitorEntity savedVisitor = visitorService.addVisitor(request);
//     return ResponseEntity.ok(savedVisitor);
// }


      
//     @GetMapping("/AllVisitors")
//     public ResponseEntity<List<VisitorEntity>> getAllVisitors() {
//         return ResponseEntity.ok(visitorService.getAllVisitors());
//     }


// @GetMapping("/Allvisitors")
// public List<VisitorEntity> getVisitors() {

//     Authentication auth =
//         SecurityContextHolder.getContext().getAuthentication();

//     String mobile = auth.getName();

//     User user = userRepository.findByMobile(mobile);

//     if (user.getRole().equals("USER")) {
//         return visitorRepository.findByHost(mobile);
//     } else {
//         return visitorRepository.findAll();
//     }
// }



// }



package com.dcm.visitor_management.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.dcm.visitor_management.dto.VisitorRequest;
import com.dcm.visitor_management.dto.VisitorResponse;
import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.entity.VisitorEntity;
import com.dcm.visitor_management.repository.UserRepository;
import com.dcm.visitor_management.repository.VisitorRepository;
import com.dcm.visitor_management.service.VisitorService;

@RestController
@RequestMapping("/auth")
public class VisitorController {

    private final VisitorService visitorService;
    private final VisitorRepository visitorRepository;
    private final UserRepository userRepository;

    // ✅ Proper Constructor Injection
    public VisitorController(
            VisitorService visitorService,
            VisitorRepository visitorRepository,
            UserRepository userRepository) {

        this.visitorService = visitorService;
        this.visitorRepository = visitorRepository;
        this.userRepository = userRepository;
    }

    // @PostMapping("/visitors")
    // public ResponseEntity<VisitorEntity> addVisitor(
    //         @ModelAttribute VisitorRequest request) throws Exception {

    //     VisitorEntity savedVisitor = visitorService.addVisitor(request);
    //     return ResponseEntity.ok(savedVisitor);
    // }



    @PostMapping("/visitors")
public ResponseEntity<VisitorResponse> addVisitor(@ModelAttribute VisitorRequest request) throws Exception {
    VisitorEntity savedVisitor = visitorService.addVisitor(request);

    VisitorResponse dto = new VisitorResponse();
    dto.setId(savedVisitor.getId());
    dto.setFullName(savedVisitor.getFullName());
    dto.setMobileNumber(savedVisitor.getMobileNumber());
    dto.setCompanyName(savedVisitor.getCompanyName());
    dto.setGender(savedVisitor.getGender());
    dto.setEmailId(savedVisitor.getEmailId());
    dto.setPhoto(savedVisitor.getPhotoBase64());
    dto.setHost(savedVisitor.getHost());
    dto.setvisitDate(savedVisitor.getVisitDate().toString());
    dto.setvisitTime(savedVisitor.getVisitTime().toString());
    dto.setpunchOutDateTime(savedVisitor.getPunchOutTime() != null ? savedVisitor.getPunchOutTime().toString() : null);

    return ResponseEntity.ok(dto);
}



    


    // // ❌ Avoid exposing this directly (security risk)
    // @GetMapping("/AllVisitors")
    // public ResponseEntity<List<VisitorEntity>> getAllVisitors() {
    //     return ResponseEntity.ok(visitorService.getAllVisitors());
    // }

//     // ✅ Role-based visitor fetch
//   @GetMapping("/AllVisitors")
// public List<VisitorEntity> getVisitors(Authentication auth) {
//     String identifier = auth.getName(); // JWT subject, e.g., "4563782534"

//     if (identifier == null) {
//         throw new RuntimeException("JWT token has no subject");
//     }

//     // Employee → 8-digit code → show all visitors
//     if (identifier.matches("\\d{8}")) {
//         return visitorRepository.findAll();
//     }

//     // User → 10-digit mobile → show only visitors created by this user
//     return visitorRepository.findByHost(identifier); // host = mobile as string
// }


    @GetMapping("/AllVisitors")
    public List<VisitorResponse> getVisitors() {
        return visitorService.getAllVisitorsForUser();
    }


    @GetMapping("/visitors/by-mobile/{mobile}")
public ResponseEntity<VisitorEntity> getVisitorByMobile(@PathVariable String mobile) {
    return visitorRepository.findTopByMobileNumberOrderByIdDesc(mobile)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}


// @PutMapping("/visitors/{id}/punch-out")
// public ResponseEntity<VisitorEntity> punchOut(@PathVariable Long id) {
//     return ResponseEntity.ok(visitorService.punchOutVisitor(id));
// }

@PostMapping("/visitors/{id}/punch-out")
public ResponseEntity<VisitorEntity> punchOut(@PathVariable Long id) {
    return ResponseEntity.ok(visitorService.punchOutVisitor(id));
}




}
