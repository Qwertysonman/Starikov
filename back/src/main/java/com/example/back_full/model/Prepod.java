package com.example.back_full.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Prepods")
public class Prepod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "FIO", nullable = false, length = 255)
    private String FIO;

    @Column(name = "mobile", length = 20)
    private String mobile;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "transmission", length = 255)
    private String transmission;
}
