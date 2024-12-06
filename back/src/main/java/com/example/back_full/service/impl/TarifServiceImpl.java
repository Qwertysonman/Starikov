package com.example.back_full.service.impl;

import com.example.back_full.model.Filial;
import com.example.back_full.model.Tarif;
import com.example.back_full.repository.FilialRepository;
import com.example.back_full.repository.TarifRepository;
import com.example.back_full.service.FilialService;
import com.example.back_full.service.TarifService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
@AllArgsConstructor
public class TarifServiceImpl implements TarifService {

    private TarifRepository tarifrepository;
    @Override
    public List<String> findAllTarifsNames() {
        return tarifrepository.findAllTarifsNames();
    }
    @Override
    public List<Tarif> findAllTarifs() {return tarifrepository.findAll();}
}
