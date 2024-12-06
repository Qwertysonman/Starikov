package com.example.back_full.service.impl;

import com.example.back_full.model.Admin;
import com.example.back_full.model.Student;
import com.example.back_full.repository.AdminRepository;
import com.example.back_full.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.back_full.util.PasswordEncoder;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Admin saveAdmin(Admin admin) {
        admin.setStudPassword(passwordEncoder.encode(admin.getStudPassword()));
        return repository.save(admin);
    }
    @Override
    public Admin updateAdmin(Admin admin) {
        Optional<Admin> existingAdmin = repository.findById(admin.getId());
        if (existingAdmin.isPresent()) {
            System.out.println("Он существует вау");
            return repository.save(admin);
        } else {
            return null;
        }
    }
    @Override
    public Admin findByEmailAndPassword(String email, String password) {
        Admin admin = repository.findAdminByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getStudPassword())){
            return admin;
        }
        return null;
    }
}
