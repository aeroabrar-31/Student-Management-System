package com.abrar.StudentManagementSystem.Controllers;

import com.abrar.StudentManagementSystem.DTO.Authrequest;
import com.abrar.StudentManagementSystem.Services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
public class AuthenticationController {

    @Autowired
    public JwtService jwtService;

    @Autowired
    public AuthenticationManager authenticationManager;

    @PostMapping("/generate")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody Authrequest authrequest)
    {

        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authrequest.getUsername(), authrequest.getPassword()));

        System.out.println("At the line 31 ");
        if(authenticate.isAuthenticated())
        {
            return ResponseEntity.ok(jwtService.generateToken(authrequest));
        }
        else
        {
//            throw new UsernameNotFoundException("User name doesn;t exists !!")
            System.out.println("At the line 39");
            return  ResponseEntity.status(404).body("User name doesn't exists");
        }


    }
}
