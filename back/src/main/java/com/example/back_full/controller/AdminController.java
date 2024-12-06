package com.example.back_full.controller;

import com.example.back_full.model.Admin;
import com.example.back_full.model.Filial;
import com.example.back_full.model.Student;
import com.example.back_full.service.AdminService;
import com.example.back_full.service.FilialService;
import com.example.back_full.service.StudentService;
import com.example.back_full.util.ExamStatsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/admins")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    private final AdminService service;

    // Сохранение нового админаа (регистрация) (пока не знаю буду ли реализовывать)
    @PostMapping("/admin_register")
    public ResponseEntity<Admin> saveAdmin(@RequestBody Admin admin){
        return ResponseEntity.ok(service.saveAdmin(admin));
    }
    // Поиск админа по почте и паролю (логирование)
    @PostMapping("/admin_login")
    public ResponseEntity<Admin> findByEmailAndPassword(@RequestBody Map<String, String> credentials){
        String email = credentials.get("email");
        String password = credentials.get("studPassword");
        System.out.println(email);
        System.out.println(password);
        Admin admin = service.findByEmailAndPassword(email, password);
        if (admin != null){
            return ResponseEntity.ok(admin);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    // Редактирование админа
    @PutMapping("/admin_update")
    public ResponseEntity<Admin> updateStudent(@RequestBody Admin admin) {
        Admin updateadmin = service.updateAdmin(admin);
        System.out.println("я тута");
        if (updateadmin != null) {
            return ResponseEntity.ok(updateadmin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
