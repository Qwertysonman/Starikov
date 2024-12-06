package com.example.back_full.service;

import com.example.back_full.model.Filial;
import com.example.back_full.model.Prepod;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PrepodService {
    Integer findPrepodId(String name);
    List<String> findAllPrepodsNames();
    Prepod findPrepodByName(String name);
    List<Prepod> findAllPrepods();
    Prepod newPrepod(Prepod prepod);
    Prepod updatePrepod(Prepod prepod);
    void deletePrepodById(Integer id);
    Prepod findPrepodByEmail(String email);
    Prepod findByEmailAndPassword(String email, String password);
}
