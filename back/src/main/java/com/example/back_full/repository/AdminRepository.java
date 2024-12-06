package com.example.back_full.repository;

import com.example.back_full.model.Admin;
import com.example.back_full.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Admin findAdminByEmail(String email);

}