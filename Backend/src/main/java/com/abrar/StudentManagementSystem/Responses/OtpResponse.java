package com.abrar.StudentManagementSystem.Responses;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class OtpResponse {
    public boolean isSuccessfullySent;
}
