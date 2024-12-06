package com.example.back_full.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "prepod_account")
public class PrepodAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    @JsonProperty("email")
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    @JsonProperty("studPassword")
    private String studPassword;
}