package com.example.back_full.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "FIO", nullable = false, length = 255)
    @JsonProperty("FIO")
    private String FIO;

    @Column(name = "mobile", length = 20)
    @JsonProperty("mobile")
    private String mobile;

    @Column(name = "email", length = 255)
    @JsonProperty("email")
    private String email;

    @Column(name = "stud_password", nullable = false, length = 255)
    @JsonProperty("studPassword")
    private String studPassword;

    @Column(name = "date_born", nullable = false)
    @JsonProperty("dateBorn")
    private LocalDate dateBorn;

    @Column(name = "state_teory", length = 10)
    @JsonProperty("stateTeory")
    private String stateTeory;

    @Column(name = "state_practic", length = 10)
    @JsonProperty("statePractic")
    private String statePractic;

    @Column(name = "tarif", length = 30)
    @JsonProperty("tarif")
    private String tarif;

    @Column(name = "balans")
    @JsonProperty("balans")
    private Integer balans;

    @Column(name = "id_filial")
    @JsonProperty("idFilial")
    private Integer idFilial;

    @ManyToOne
    @JoinColumn(name = "id_filial", insertable = false, updatable = false)
    @JsonProperty("filial")
    private Filial filial;
}
