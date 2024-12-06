package com.example.back_full.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Filials")
public class Filial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "phone", length = 20)
    private String phone;

    @Column(name = "email", length = 255)
    private String email;
}
