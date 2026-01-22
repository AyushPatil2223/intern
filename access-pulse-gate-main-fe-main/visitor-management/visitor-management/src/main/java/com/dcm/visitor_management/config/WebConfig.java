package com.dcm.visitor_management.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// import lombok.Value;

@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class WebConfig implements WebMvcConfigurer {


    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    //     registry.addMapping("/**")
    //             .allowedOriginPatterns("*")   // Use this for wildcard
    //             .allowedMethods("*")
    //             .allowedHeaders("*")
    //             .allowCredentials(true)
    //             .exposedHeaders("Authorization")
    //             .maxAge(3600);
    // }


    @Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins(
            "http://localhost:8080",
            "http://127.0.0.1:8080",
            "http://192.168.1.100:8080" ,  // 🔁 replace with your actual IP
            "http://172.20.10.2:8080",
                        "https://uat.indianoil.co.in",
                                  "https://spandan.indianoil.co.in"
            
        )
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true)
        .exposedHeaders("Authorization")
        .maxAge(3600);
}




    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/visitor-photos/**")
                .addResourceLocations(
                    "file:C:/Users/ayush/Downloads/access-pulse-gate-main-fe-main/" +
                    "access-pulse-gate-main-fe-main/visitor-management/" +
                    "visitor-management/visitor-photos/"
                );
    }


    

}

