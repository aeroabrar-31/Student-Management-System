package com.abrar.StudentManagementSystem.Services;

import com.abrar.StudentManagementSystem.Models.ServerAdmin;
import com.abrar.StudentManagementSystem.Repositories.adminrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerService {

    @Autowired
    private adminrepo repo;

    @Autowired
    private PasswordEncoder encoder;


    public void add(ServerAdmin admin) {
        admin.setPassword(encoder.encode(admin.getPassword()));
        repo.save(admin);
    }

    public List<ServerAdmin> getall() {
       return  repo.findAll();
    }
}
