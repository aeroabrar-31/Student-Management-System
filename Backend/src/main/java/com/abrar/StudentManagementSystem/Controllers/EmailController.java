package com.abrar.StudentManagementSystem.Controllers;


import com.abrar.StudentManagementSystem.Models.Email;
import com.abrar.StudentManagementSystem.Models.OtpPassword;
import com.abrar.StudentManagementSystem.Models.emailAll;
import com.abrar.StudentManagementSystem.Models.emailToAdmin;
import com.abrar.StudentManagementSystem.Responses.OtpResponse;
import com.abrar.StudentManagementSystem.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin
public class EmailController {

    @Autowired
    private EmailService service;

    @PostMapping("/sendemail")
    public ResponseEntity<?> Send(@RequestBody Email obj)
    {
        boolean b=service.send(obj);
        System.out.println("22 controller");


        if(b)
          return ResponseEntity.ok("Email Successfully sent !");

        return ResponseEntity.badRequest().body("Something went wrong...");
    }

    @GetMapping("/sendotp/{email}")
    public ResponseEntity<?> sendOtp(@PathVariable String email)
    {
        boolean b=service.sendOtp(email);

        OtpResponse response=new OtpResponse();

        if(b)
        {
            response.isSuccessfullySent=true;
            return ResponseEntity.status(200).body(response);
        }
        return ResponseEntity.badRequest().body(response);

    }


    @PostMapping("/bomb")
    public ResponseEntity<?> bomb(@RequestBody Email obj)
    {
        boolean b=service.bomb(obj);

      if(b) return ResponseEntity.ok(obj);

      return ResponseEntity.badRequest().body("Can't send");
    }


    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody OtpPassword obj)
    {
        boolean validate = service.validate(obj);

        if(validate)
        {
            return ResponseEntity.ok(obj);
        }
        return ResponseEntity.badRequest().body(obj);

    }

    @PostMapping("/sendtoall")
    public ResponseEntity<?> sendToAll(@RequestBody emailAll email)
    {
        boolean b=service.sendToAll(email);

        return ResponseEntity.ok(email);
    }

    @PostMapping("/sendtoadmin")
    public ResponseEntity<?> sendTOAdmin(@RequestBody emailToAdmin email)
    {
        boolean b=service.sendToAdmin(email);

        return ResponseEntity.ok(email);
    }

}
