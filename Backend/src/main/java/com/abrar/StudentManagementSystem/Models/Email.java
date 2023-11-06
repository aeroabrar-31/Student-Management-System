package com.abrar.StudentManagementSystem.Models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Email {

    private String to;

    private int count;

    private String subject;

    private String body;
}
