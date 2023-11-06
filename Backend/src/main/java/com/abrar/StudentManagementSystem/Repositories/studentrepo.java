package com.abrar.StudentManagementSystem.Repositories;


import com.abrar.StudentManagementSystem.Models.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface studentrepo extends MongoRepository<Student,Integer> {
    Optional<Student> findByEmail(String email);
}
