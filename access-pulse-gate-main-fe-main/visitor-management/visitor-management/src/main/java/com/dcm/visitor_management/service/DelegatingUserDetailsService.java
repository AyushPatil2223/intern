package com.dcm.visitor_management.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class DelegatingUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeLoginService employeeLoginService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        System.out.println("DelegatingUserDetailsService: Loading user -> " + username);

        if (username.startsWith("USER_")) {
            return customUserDetailsService.loadUserByUsername(username);
        } else {
            return employeeLoginService.loadUserByUsername(username);
        }
    }
}
