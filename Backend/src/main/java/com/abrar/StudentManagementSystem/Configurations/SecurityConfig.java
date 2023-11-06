package com.abrar.StudentManagementSystem.Configurations;


import com.abrar.StudentManagementSystem.Filters.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.web.server.ServerHttpSecurity.http;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {


    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder)
    {
//        UserDetails user1= User.withUsername("Abrar")
//                .password(encoder.encode("abrar"))
//                .roles("ADMIN")
//                .build();
//
//        UserDetails user2= User.withUsername("Kalam")
//                .password(encoder.encode("kalam"))
//                .roles("USER")
//                .build();



        return new CustomUsersConfig();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

         http.csrf( c->c.disable())


//                .authorizeHttpRequests( a-> a.requestMatchers("/student/get/{id}",
//                        "/student/getall",
//                        "/server/add",
//                        "/token/generate",
//                        "/student/login",
//                        "/student/signup",
//                        "/student/getbyemail/{email}").permitAll()
//                        .requestMatchers(HttpMethod.PUT,"/student/edit/{id}").permitAll())
//
//                .authorizeHttpRequests( a-> a.requestMatchers("/student/admin","/student/hrmanager","/student/add","/student/getpswd/{id}","/server/getall").authenticated())

                 .authorizeHttpRequests(a->a.requestMatchers("/**").permitAll())


                .sessionManagement(s-> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authenticationProvider(authenticationProvider())

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)


                .cors(Customizer.withDefaults());

              return http .build();

//       return http.csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/student/add","/student/getall")
//                .permitAll()
//
//                .and()
//                .authorizeHttpRequests()
//                .requestMatchers("/student/secure")
//                .authenticated()
//
//
//                .and()
//               .httpBasic(Customizer.withDefaults())
//                .build();


    }

    @Autowired
    public UserDetailsService userDetailsService;

    @Autowired
    public JwtFilter jwtFilter;

    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());

        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager temp(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

}










//return http.csrf( c->c.disable())
//
//            .authorizeHttpRequests( a-> a.requestMatchers("/api/welcome").permitAll())
//
//
//            .authorizeHttpRequests( a-> a.requestMatchers("/api/products/**").authenticated())
//
//
//            .formLogin(a-> a.build());
