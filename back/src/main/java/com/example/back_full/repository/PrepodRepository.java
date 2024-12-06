package com.example.back_full.repository;

import com.example.back_full.model.Prepod;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PrepodRepository extends JpaRepository<Prepod, Integer> {
    @Query("SELECT id FROM Prepod WHERE FIO = :fio")
    Integer findPrepodId(@Param("fio") String fio);
    @Query("SElECT f.FIO FROM Prepod f")
    List<String> findAllPrepodsNames();
    @Query("SELECT p FROM Prepod p WHERE p.FIO = :fio")
    Prepod findPrepodByName(@Param("fio") String fio);
    @Query("SELECT p FROM Prepod p WHERE p.email = :email")
    Prepod findPrepodByEmail(@Param("email") String email);
}
