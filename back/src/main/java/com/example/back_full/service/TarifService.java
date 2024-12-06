package com.example.back_full.service;

import com.example.back_full.model.Filial;
import com.example.back_full.model.Student;
import com.example.back_full.model.Tarif;

import java.util.List;

public interface TarifService {
    List<String> findAllTarifsNames();
    List<Tarif> findAllTarifs();
}
