package com.example.back_full.service;

import com.example.back_full.model.Filial;
import com.example.back_full.model.Student;

import java.util.List;

public interface FilialService {
    Filial findFilialByName(String name);
    List<String> findAllFilialsNames();
}
