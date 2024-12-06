package com.example.back_full.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Examens")
public class Examen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_student", nullable = false)
    private int idStudent;

    @Column(name = "id_prepod", nullable = false)
    private int idPrepod;

    @Column(name = "data_examen")
    private LocalDate dataExamen;

    @Column(name = "time_slot", length = 20)
    private String timeSlot;

    @Column(name = "result", length = 10)
    private String result;

    @Column(name = "flaw")
    private int flaw;

    @Column(name = "type_examen", length = 10)
    private String typeExamen;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_student", insertable = false, updatable = false)
    private Student student;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_prepod", insertable = false, updatable = false)
    private Prepod prepod;
}
