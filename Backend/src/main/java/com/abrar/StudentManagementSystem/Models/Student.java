package com.abrar.StudentManagementSystem.Models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Document(collection = "students")
public class Student {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    private int id;

    private String name;

    @Indexed(unique = true)
    private String email;

//    private String imageurl;

    private String roll;

    private String branch;

    private String year;

    private String password;

    private String gender;

    private String phone;

    private String dob;



}
