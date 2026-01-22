// package com.dcm.visitor_management.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.session.web.http.DefaultCookieSerializer;

// @Configuration

// public class CookieConfig {
//     @Bean
//     public DefaultCookieSerializer cookieSerializer() {
//         DefaultCookieSerializer serializer = new DefaultCookieSerializer();
//         serializer.setSameSite("None");
//         serializer.setUseSecureCookie(false);   // HTTP testing
//         serializer.setUseHttpOnlyCookie(true);
//         serializer.setCookiePath("/dcm");
//         return serializer;
//     }
// }
