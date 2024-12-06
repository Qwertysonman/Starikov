package com.example.back_full.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Tarifs")
public class Tarif {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "amount")
    private int amount;

    @Column(name = "summ")
    private int summ;
}
