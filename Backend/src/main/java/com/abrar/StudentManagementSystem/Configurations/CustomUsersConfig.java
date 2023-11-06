package com.abrar.StudentManagementSystem.Configurations;

import com.abrar.StudentManagementSystem.Models.ServerAdmin;
import com.abrar.StudentManagementSystem.Models.Student;
import com.abrar.StudentManagementSystem.Repositories.adminrepo;
import com.abrar.StudentManagementSystem.Repositories.studentrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUsersConfig implements UserDetailsService {


    @Autowired
    public adminrepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Optional<ServerAdmin> user= repo.findByUsername(username);

        return user.map(CustomerUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

    }
}
