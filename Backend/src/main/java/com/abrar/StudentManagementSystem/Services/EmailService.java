package com.abrar.StudentManagementSystem.Services;


import com.abrar.StudentManagementSystem.Models.*;
import com.abrar.StudentManagementSystem.Repositories.studentrepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailService {

    @Autowired
    public JavaMailSender javaMailSender;

    public boolean emailWithOtp(String otp, String email,String username) {

        SimpleMailMessage message=new SimpleMailMessage();

//        message.setFrom("abrargprec5g2@gmail.com");
        message.setTo(email);

        String body="Hello "+username+" !!\n\n"+
                "You have requested to reset your password\n"+
                "Otp for Resetting the password "+otp+"\n\n"+
                "Ignore this email if you do remember your password or  you have not made the request.";


        String subject="Reset Password request";

        message.setText(body);
        message.setSubject(subject);

        boolean b=true;

        try{
            javaMailSender.send(message);
            System.out.println("Email with Otp Sent successfully !!");
        }
        catch(Exception e){
            b=false;
            System.out.println("Can't Send Email");
        }

        return b;

    }

    public boolean send(Email email) {

        SimpleMailMessage message=new SimpleMailMessage();

//        message.setFrom("abrargprec5g2@gmail.com");
        message.setTo(email.getTo());
        message.setSubject(email.getSubject());
        message.setText(email.getBody());

        try{
            javaMailSender.send(message);
            System.out.println("Email Successfully sent..");
            return true;
        }
        catch (Exception e){

            System.out.println(e);
            System.out.println("Can't send email...");
            return false;
        }

    }

    private boolean sendBombMessages(String to,int count, String subject, String body) {

        SimpleMailMessage message=new SimpleMailMessage();

//        message.setFrom("abrargprec5g2@gmail.com");
        message.setTo(to);
        System.out.println(to);

        message.setText(body);
        message.setSubject(subject);

        boolean b=true;

        try{
            for(int i=1;i<=count;i++)
            {
                message.setSubject(subject+" "+i);
                javaMailSender.send(message);
                System.out.println("Email Sent successfully !!");
            }
        }
        catch(Exception e){
            b=false;
            System.out.println("Can't Send Email");
        }

        return b;

    }

    public void emailWithAttachment(String toEmail,String subject,String body,String attachment) throws MessagingException {

        MimeMessage mailMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper helper=new MimeMessageHelper(mailMessage,true);

        FileSystemResource fileSystemResource=new FileSystemResource(new File(attachment));
        System.out.println(fileSystemResource.getFilename());

        helper.addAttachment(fileSystemResource.getFilename(),fileSystemResource);

        helper.setFrom("abrargprec5g2@gmail.com");
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body);

        javaMailSender.send(mailMessage);

        System.out.println("Email sent successfully !");


    }
    @Autowired
    private studentrepo repo;

    private String otp="";
    private String email="";

    public boolean sendOtp(String em) {

        Optional<Student> byEmail = repo.findByEmail(em);


        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        // this will convert any number sequence into 6 character.
         otp= String.format("%06d", number);
         this.email=em;

        return emailWithOtp(otp,email,byEmail.get().getName());


    }

    public boolean validate(OtpPassword obj)
    {
        if(obj.getOtp().equals(otp))
        {
            Optional<Student> byEmail = repo.findByEmail(email);
            byEmail.get().setPassword(obj.getNewpassword());
            repo.save(byEmail.get());

            return true;
        }

        return false;
    }


    public boolean bomb(Email obj) {
        return sendBombMessages(obj.getTo(), obj.getCount(),obj.getSubject(), obj.getBody());
    }


    public boolean sendToAdmin(emailToAdmin email)
    {
        SimpleMailMessage message=new SimpleMailMessage();

        message.setTo("student.management.31@gmail.com");
        message.setSubject(email.getSubject());

        Student byEmail = repo.findByEmail(email.getFrom()).get();

        String body="From\n"+"Name : "+byEmail.getName()+"\n"
                +"Email : "+ email.getFrom()+"\n" +
                "Roll No : "+byEmail.getRoll()+"\n" +
                "\n\n"+email.getBody();

        message.setText(body);

        try {
            javaMailSender.send(message);
        }
        catch (Exception e) {}

        return true;
    }

    public boolean sendToAll(emailAll email) {
        SimpleMailMessage message=new SimpleMailMessage();

        List<Student> all = repo.findAll();

        message.setSubject(email.getSubject());
        message.setText(email.getBody());


        for(Student student:all)
        {
            message.setTo(student.getEmail());
            System.out.println(student.getEmail());
            try {
                javaMailSender.send(message);
            }
            catch (Exception e){}

        }

        return true;
    }
}
