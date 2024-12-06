package com.example.back_full.repository;

import com.example.back_full.model.Filial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FilialRepository extends JpaRepository<Filial, Integer> {
    Filial findFilialByName(String name);
    @Query("SElECT f.name FROM Filial f")
    List<String> findAllFilialsNames();
    @Query("SELECT COUNT(f) FROM Student f WHERE f.filial.name = :name")
    Integer statFilials(@Param("name") String name);
}
