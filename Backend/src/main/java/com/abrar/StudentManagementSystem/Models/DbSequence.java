package com.abrar.StudentManagementSystem.Models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Builder
@RequiredArgsConstructor
@Document(collection = "db_sequence")
public class DbSequence {

    @Id
    private String  id;
    private int seq;
}
