package com.abrar.StudentManagementSystem.Services;


import com.abrar.StudentManagementSystem.Models.LoginEntity;
import com.abrar.StudentManagementSystem.Models.Student;
import com.abrar.StudentManagementSystem.Repositories.studentrepo;
import com.abrar.StudentManagementSystem.Responses.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.abrar.StudentManagementSystem.Models.Student.SEQUENCE_NAME;

@Service
public class Studentservice {

    @Autowired
    public SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public studentrepo repo;

    @Autowired
    public PasswordEncoder passwordEncoder;


    public boolean addStudent(Student student) {
        try
        {
            student.setId(sequenceGeneratorService.getSequenceNumber(SEQUENCE_NAME));
//            student.setPassword(passwordEncoder.encode(student.getPassword()));
            repo.save(student);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }

    public List<Student> getAll() {

       return repo.findAll();
    }

    public Student getById(int id) {

        Optional<Student> byId = repo.findById(id);

        if(byId.isPresent())
        {
            return byId.get();
        }
        return null;
    }

    public String getPswd(int id) {
     return  repo.findById(id).get().getPassword();
    }

    public boolean delete(int id) {

            Optional<Student> stud = repo.findById(id);

            if(stud.isPresent())
            {
                repo.delete(stud.get());
                return true;
            }
            return false;

    }

    public void update(int id,Student stud) {
        stud.setId(id);
        repo.save(stud);
    }

    public Student getByEmail(String email) {
        Optional<Student> byEmail = repo.findByEmail(email);

        return byEmail.orElse(null);
    }

    public LoginResponse check(LoginEntity obj) {

        Optional<Student> byEmail = repo.findByEmail(obj.getEmail());

        LoginResponse response=new LoginResponse();


        if(byEmail.isPresent()){
            response.setUserExists(true);
//            System.out.println(byEmail.get().getPassword());
//            System.out.println(passwordEncoder.encode(obj.getPassword()));
            if(byEmail.get().getPassword().equals(obj.getPassword()))
            {
                response.setPasswordCorrect(true);

            }
        }

        return response;
    }
}
