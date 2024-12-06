package com.example.back_full.service.impl;

import com.example.back_full.model.Filial;
import com.example.back_full.repository.FilialRepository;
import com.example.back_full.service.FilialService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FilialServiceImpl implements FilialService {

    private FilialRepository filialrepository;
    @Override
    public Filial findFilialByName(String name) {
        return filialrepository.findFilialByName(name);
    }

    @Override
    public List<String> findAllFilialsNames() {
        return filialrepository.findAllFilialsNames();
    }
}
