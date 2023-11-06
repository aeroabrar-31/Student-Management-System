package com.abrar.StudentManagementSystem.Controllers;

import com.abrar.StudentManagementSystem.Models.LoginEntity;
import com.abrar.StudentManagementSystem.Models.Student;
import com.abrar.StudentManagementSystem.Responses.AddedResponse;
import com.abrar.StudentManagementSystem.Responses.DeleteResponse;
import com.abrar.StudentManagementSystem.Responses.LoginResponse;
import com.abrar.StudentManagementSystem.Services.Studentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    public Studentservice service;

    @GetMapping("/getall")
    public ResponseEntity<?> getAll()
    {
        return ResponseEntity.ok(service.getAll());
    }


    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody Student student)
    {
       boolean temp= service.addStudent(student);

        AddedResponse obj=new AddedResponse(temp);

       if(temp)
       {
           return ResponseEntity.status(201).body(obj);
       }

        return ResponseEntity.badRequest().body(obj);
    }




    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> fetch()
    {
        return ResponseEntity.ok("Accessed to only admins");
    }

    @PreAuthorize("hasAnyRole('ROLE_HR','ROLE_MANAGER')")
    @GetMapping("/hrmanager")
    public ResponseEntity<?> secure()
    {
        return ResponseEntity.ok("Accessed to only hr and manager");
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id)
    {
       boolean temp= service.delete(id);
        DeleteResponse obj=new DeleteResponse(temp);

        if(temp)
        {
            return ResponseEntity.status(200).body(obj);
        }

        return ResponseEntity.status(404).body(obj);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginEntity obj)
    {
      LoginResponse temp= service.check(obj);

      if(temp.isPasswordCorrect && temp.isUserExists) return   ResponseEntity.ok(temp);

      return ResponseEntity.badRequest().body(temp);
    }

    @GetMapping("/getbyemail/{email}")
    public ResponseEntity<?> get(@PathVariable String email)
    {
        Student byEmail = service.getByEmail(email);

        if(byEmail!=null)
        {
            return ResponseEntity.ok(byEmail);
        }
        return ResponseEntity.badRequest().body("No student found");
    }


    @PutMapping("/edit/{id}")
    public ResponseEntity<?> update(@PathVariable int id,@RequestBody Student stud)
    {
        service.update(id,stud);
        System.out.println(stud);
        return ResponseEntity.ok(stud);
    }





    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable int id)
    {
        Student stud=service.getById(id);

        if(stud!=null)
            return ResponseEntity.ok(stud);

        return ResponseEntity.badRequest().body(stud);
    }





}
