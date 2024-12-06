package com.example.back_full.controller;

import com.example.back_full.service.FilialService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/filials")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class FilialController {
    private final FilialService filialService;
    @GetMapping("/find_all")
    public List<String> findAllFilialsNames(){
        return filialService.findAllFilialsNames();
    }
}