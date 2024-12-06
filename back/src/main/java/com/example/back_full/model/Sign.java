package com.example.back_full.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Signs")
public class Sign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "id_student", nullable = false)
    private int idStudent;

    @Column(name = "id_prepod", nullable = false)
    private int idPrepod;

    @Column(name = "data_sign")
    private LocalDate dataSign;

    @Column(name = "time_slot", length = 20)
    private String timeSlot;

    @Column(name = "type_sign", length = 30)
    private String typeSign;

    @ManyToOne
    @JoinColumn(name = "id_student", insertable = false, updatable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "id_prepod", insertable = false, updatable = false)
    private Prepod prepod;
}
