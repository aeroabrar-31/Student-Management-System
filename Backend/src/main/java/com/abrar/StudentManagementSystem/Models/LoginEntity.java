package com.abrar.StudentManagementSystem.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class LoginEntity {

    public String email;
    public String password;
}
