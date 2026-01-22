// package com.dcm.visitor_management.config;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

// import com.dcm.visitor_management.service.DelegatingUserDetailsService;


// @Configuration
// @EnableWebSecurity
// public class MySecurityConfig extends WebSecurityConfigurerAdapter {

//     @Autowired
//     private DelegatingUserDetailsService delegatingUserDetailsService;

//     @Autowired
//     private JwtAuthenticationFilter jwtFilter;

//     @Override
//     protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//         auth.userDetailsService(delegatingUserDetailsService);
//     }

//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http.csrf().disable()
//             .cors() // keep cors enabled
//             .and()
//             .authorizeRequests()
//             // allow OPTIONS only for CORS preflight

//                         .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()


//             .antMatchers(HttpMethod.OPTIONS, "/auth/**", "/complaintDetails/**", "/captcha/**").permitAll()
//             // block OPTIONS everywhere else
//             .antMatchers(HttpMethod.OPTIONS, "/**").denyAll()
//             .antMatchers("/auth/**", "/complaintDetails/**", "/captcha/**").permitAll()
//             //  .antMatchers("/dmc/employee/login").permitAll() 
//                     .antMatchers("/visitor-photos/**").permitAll()

//             .anyRequest().authenticated()
//             .and()
//             // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             .sessionManagement()
//             .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) 
//             .and()
//             .headers()
//                 .contentSecurityPolicy("default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;")
//                 .and()
//                 .contentTypeOptions()
//                 .and()
//                 .frameOptions().sameOrigin()
//                 .addHeaderWriter((request, response) -> {
//                     response.setHeader("Cache-Control",
//                             "no-cache, no-store, must-revalidate, pre-check=0, post-check=0, max-age=0, s-maxage=0");
//                     response.setHeader("Pragma", "no-cache");
//                     response.setHeader("Expires", "0");
//                 });

//         http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//     }



//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return NoOpPasswordEncoder.getInstance();
//     }

//     @Bean
//     @Override
//     public AuthenticationManager authenticationManagerBean() throws Exception {
//         return super.authenticationManagerBean();
//     }
// }



package com.dcm.visitor_management.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.dcm.visitor_management.service.DelegatingUserDetailsService;

@Configuration
@EnableWebSecurity
public class MySecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DelegatingUserDetailsService delegatingUserDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(delegatingUserDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            // ❌ Disable CSRF for API usage
            .csrf().disable()

            // ✅ Enable CORS (uses your CorsRegistry config)
            .cors().and()

            .authorizeRequests()

                // ✅ MUST allow all OPTIONS (CORS preflight)
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ Public endpoints
                .antMatchers(
                    "/auth/**",
                    "/complaintDetails/**",
                    "/captcha/**",
                    "/visitor-photos/**"
                ).permitAll()

                // 🔒 Everything else secured
                .anyRequest().authenticated()
            .and()

            // ✅ Session allowed (required for captcha + login)
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            .and()

            // ✅ Basic secure headers
            .headers()
                .frameOptions().sameOrigin();

        // ✅ JWT filter before username/password filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

    // ⚠️ Only for development (DO NOT use in production)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
