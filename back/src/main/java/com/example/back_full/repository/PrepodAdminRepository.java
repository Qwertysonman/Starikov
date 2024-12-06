package com.example.back_full.repository;

import com.example.back_full.model.Prepod;
import com.example.back_full.model.PrepodAccount;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PrepodAdminRepository extends JpaRepository<PrepodAccount, Integer> {
    @Query("SELECT p FROM PrepodAccount p WHERE p.email = :email")
    PrepodAccount findPrepodByEmail(@Param("email") String email);
}