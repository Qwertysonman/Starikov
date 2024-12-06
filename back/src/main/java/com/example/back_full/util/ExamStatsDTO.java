package com.example.back_full.util;

public class ExamStatsDTO {
    private Integer attemptNumber; // Попытка в формате Integer
    private Long studentsCount;    // Количество студентов в формате Long
    private String typeExamen;

    public ExamStatsDTO(Integer attemptNumber, Long studentsCount, String typeExamen) {
        this.attemptNumber = attemptNumber;
        this.studentsCount = studentsCount;
        this.typeExamen = typeExamen;
    }

    // Геттеры и сеттеры
    public Integer getAttemptNumber() {
        return attemptNumber;
    }

    public void setAttemptNumber(Integer attemptNumber) {
        this.attemptNumber = attemptNumber;
    }

    public Long getStudentsCount() {
        return studentsCount;
    }

    public void setStudentsCount(Long studentsCount) {
        this.studentsCount = studentsCount;
    }

    public String getTypeExamen() {
        return typeExamen;
    }

    public void setTypeExamen(String typeExamen) {
        this.typeExamen = typeExamen;
    }
}