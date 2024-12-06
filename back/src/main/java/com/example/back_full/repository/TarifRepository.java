package com.example.back_full.repository;

import com.example.back_full.model.Filial;
import com.example.back_full.model.Tarif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TarifRepository extends JpaRepository<Tarif, Integer> {
    @Query("SElECT f.name FROM Tarif f")
    List<String> findAllTarifsNames();
}
