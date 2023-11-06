package com.abrar.StudentManagementSystem.Responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AddedResponse {
    public boolean isAddedSuccessfully;
}
