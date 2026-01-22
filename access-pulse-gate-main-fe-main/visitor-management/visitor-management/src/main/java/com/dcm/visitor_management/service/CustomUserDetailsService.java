// package com.dcm.visitor_management.service;

// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.dcm.visitor_management.dto.UserLoginResponse;


// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     @Autowired
//     private UserService userService; 

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         UserLoginResponse user = userService.findByUsername(username);
//         if (user == null) {
//             throw new UsernameNotFoundException("User not found: " + username);
//         }

//         List<GrantedAuthority> authorities = new ArrayList<>();
//         authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

//         return new org.springframework.security.core.userdetails.User(
//                 user.getUsername(),
//                 "dummy", 
//                 authorities
//         );
//     }
// }




package com.dcm.visitor_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dcm.visitor_management.entity.UserEntity;
import com.dcm.visitor_management.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        UserEntity user = userRepository.findByName(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username));

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        return new org.springframework.security.core.userdetails.User(
                user.getName(),        // username
                user.getPassword(),    // password (required by Spring Security)
                authorities
        );
    }
}
