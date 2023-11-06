package com.abrar.StudentManagementSystem.Configurations;

import com.abrar.StudentManagementSystem.Models.ServerAdmin;
import com.abrar.StudentManagementSystem.Models.Student;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class CustomerUserDetails implements UserDetails {

    private String username;
    private String password;
    private List<GrantedAuthority> roles;


    public CustomerUserDetails(ServerAdmin user)
    {
        username= user.getUsername();
        password=user.getPassword();

        System.out.println(username+"  "+password);

       List<String> r= Arrays.asList(user.getRole());

        roles= Arrays.stream(user.getRole().split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
