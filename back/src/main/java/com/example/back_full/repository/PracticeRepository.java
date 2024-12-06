package com.example.back_full.repository;

import com.example.back_full.model.Practice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PracticeRepository extends JpaRepository<Practice, Integer> {
    @Query("SELECT p.place FROM Practice p WHERE p.prepod.FIO = :fio AND p.typeLesson = :typeLesson AND p.dayWeak = :dayWeak")
    List<Integer> findPlaceByPrepodFIOAndTypeLessonAndDayWeak(@Param("fio") String fio, @Param("typeLesson") String typeLesson, @Param("dayWeak") int dayWeak);
    @Query("SELECT p.timeSlot FROM Practice p WHERE p.prepod.FIO = :fio AND p.typeLesson = :typeLesson AND p.dayWeak = :dayWeak")
    List<String> findAlltimeSlots(@Param("fio") String fio, @Param("typeLesson") String typeLesson, @Param("dayWeak") int dayWeak);
    @Query("SELECT p FROM Practice p WHERE p.prepod.id = :id")
    List<Practice> getPracticesByPrepodId(@Param("id") Integer id);
}
