package com.dcm.visitor_management.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dcm.visitor_management.helper.JwtUtil;
import com.dcm.visitor_management.service.DelegatingUserDetailsService;



@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private DelegatingUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = extractToken(request);

//        System.out.println("JwtAuthenticationFilter: Cookie & Header check");

        if (token != null && !token.isEmpty()) {
            try {
                String username = jwtUtil.extractUsername(token);
//                System.out.println("Username from token: " + username);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                    System.out.println("User authenticated: " + username);
                }
            } catch (Exception e) {
                System.out.println("Exception while processing JWT: " + e.getMessage());
            }
        } else {
//            System.out.println("No JWT token found in request");
        }

        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
//                System.out.println("Cookie received: " + cookie.getName() + " = " + cookie.getValue());
                if ("jwt".equals(cookie.getName()) || "accessToken".equals(cookie.getName())) {
//                    System.out.println("Token found in cookie: " + cookie.getName());
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
