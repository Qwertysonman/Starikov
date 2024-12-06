package com.example.back_full.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Practice")
public class Practice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "day_weak")
    private int dayWeak;

    @Column(name = "id_prepod", nullable = false)
    private int idPrepod;

    @Column(name = "time_slot", length = 20)
    private String timeSlot;

    @Column(name = "type_lesson", length = 30)
    private String typeLesson;

    @Column(name = "place")
    private int place;

    @ManyToOne
    @JoinColumn(name = "id_prepod", insertable = false, updatable = false)
    private Prepod prepod;
}
