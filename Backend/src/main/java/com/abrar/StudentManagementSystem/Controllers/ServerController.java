package com.abrar.StudentManagementSystem.Controllers;

import com.abrar.StudentManagementSystem.Models.ServerAdmin;
import com.abrar.StudentManagementSystem.Services.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/server")
public class ServerController {

    @Autowired
    public ServerService service;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ServerAdmin admin)
    {
        service.add(admin);

        return ResponseEntity.ok("Added admin ...");
    }


    @GetMapping("/getall")
    public ResponseEntity<?> getall()
    {
        List<ServerAdmin> getall = service.getall();

        return ResponseEntity.ok(getall);
    }

}
