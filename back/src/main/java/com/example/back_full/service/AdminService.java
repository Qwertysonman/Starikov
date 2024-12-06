package com.example.back_full.service;

import com.example.back_full.model.Admin;

public interface AdminService {
    Admin saveAdmin(Admin admin);
    Admin updateAdmin(Admin admin);
    Admin findByEmailAndPassword(String email, String password);
}
