package com.abrar.StudentManagementSystem.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class emailAll {
    private String subject;
    private String body;
}
