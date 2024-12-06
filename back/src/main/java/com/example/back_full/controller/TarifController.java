package com.example.back_full.controller;

import com.example.back_full.model.Tarif;
import com.example.back_full.service.TarifService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/v1/tarifs")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TarifController {
    private final TarifService tarifService;
    @GetMapping("/find_all")
    public List<String> findAllTarifsNames(){
        return tarifService.findAllTarifsNames();
    }
    @GetMapping("/find_all_tarifs")
    public List<Tarif> findAllTarifs(){return tarifService.findAllTarifs();}
}