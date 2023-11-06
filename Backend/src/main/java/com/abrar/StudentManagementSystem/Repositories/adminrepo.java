package com.abrar.StudentManagementSystem.Repositories;

import com.abrar.StudentManagementSystem.Models.ServerAdmin;
import com.abrar.StudentManagementSystem.Models.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface adminrepo extends MongoRepository<ServerAdmin,String> {

    Optional<ServerAdmin> findByUsername(String username);
}
