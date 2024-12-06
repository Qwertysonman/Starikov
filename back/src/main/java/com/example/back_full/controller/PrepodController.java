package com.example.back_full.controller;

import com.example.back_full.model.Admin;
import com.example.back_full.model.Prepod;
import com.example.back_full.service.PrepodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/prepods")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class PrepodController {
    private final PrepodService prepodService;

    @GetMapping("/find_all")
    public List<String> findAllPrepodsNames(){
        return prepodService.findAllPrepodsNames();
    }
    @PostMapping("/find_id")
    public Integer findPrepodId(@RequestBody Map<String, String> requestBody) {
        String name = requestBody.get("name");
        return prepodService.findPrepodId(name);
    }
    @PostMapping("/find_prepod")
    public Prepod findPrepodByName(@RequestBody Map<String, String> requestBody){
        String name = requestBody.get("name");
        return prepodService.findPrepodByName(name);
    }
    @PostMapping("/find_prepod_by_email")
    public Prepod findPrepodByEmail(@RequestBody Map<String, String> requestBody){
        String email = requestBody.get("email");
        return prepodService.findPrepodByEmail(email);
    }
    @PostMapping("/prepod_login")
    public ResponseEntity<Prepod> findByEmailAndPassword(@RequestBody Map<String, String> credentials){
        String email = credentials.get("email");
        String password = credentials.get("studPassword");
        System.out.println(email);
        System.out.println(password);
        Prepod prepod = prepodService.findByEmailAndPassword(email, password);
        if (prepod != null){
            return ResponseEntity.ok(prepod);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping("/find_all_prepod")
    public List<Prepod> findAllPrepods(){
        return prepodService.findAllPrepods();
    }
    @PostMapping("/new_prepod")
    public Prepod newPrepod(@RequestBody Prepod prepod){
        return prepodService.newPrepod(prepod);
    }
    @PutMapping("/update_prepod")
    public Prepod updatePrepod(@RequestBody Prepod prepod){
        return prepodService.updatePrepod(prepod);
    }
    @DeleteMapping("/delete_prepod")
    public void deletePrepod(@RequestBody Prepod prepod){
        Integer id = prepod.getId();
        prepodService.deletePrepodById(id);
    }
}