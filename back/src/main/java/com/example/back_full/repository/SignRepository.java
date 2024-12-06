package com.example.back_full.repository;

import com.example.back_full.model.Sign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SignRepository extends JpaRepository<Sign, Integer> {
    @Query("SELECT s FROM Sign s WHERE s.student.id = :id AND s.dataSign >= :date")
    List<Sign> findByStudentId(@Param("id") int studentId, @Param("date") LocalDate date);
    void deleteSignById(int id);
    // Новый метод для получения списка time_slot по FIO преподавателя, type_lesson и дате
    @Query("SELECT s.timeSlot FROM Sign s WHERE s.prepod.FIO = :fio AND s.typeSign = :typeLesson AND s.dataSign = :date")
    List<String> findTimeSlotsByPrepodFIOAndTypeLessonAndDate(@Param("fio") String fio, @Param("typeLesson") String typeLesson, @Param("date") LocalDate date);
    // Новый метод для получения количества записей на определенный time_slot и дату
    @Query("SELECT COUNT(s) FROM Sign s WHERE s.timeSlot = :timeSlot AND s.dataSign = :date")
    int countSignsByTimeSlotAndDate(@Param("timeSlot") String timeSlot, @Param("date") LocalDate date);
    // Новый метод для получения списка записей по email студента и типу записи
    @Query("SELECT s FROM Sign s WHERE s.student.email = :email AND s.typeSign = :typeSign")
    List<Sign> findSignsByStudentEmailAndType(@Param("email") String email, @Param("typeSign") String typeSign);
    @Query("SELECT MAX(id) AS max_id FROM Sign")
    Integer findNext();
    @Query("SELECT COUNT(s) FROM Sign s WHERE s.typeSign = :type AND s.idStudent = :id AND s.dataSign < :date")
    Integer getNumOfSign(@Param("type") String type, @Param("id") Integer id, @Param("date") LocalDate date);
    @Query("SELECT s FROM Sign s WHERE s.student.id = :id")
    List<Sign> findAllByStudentId(@Param("id") Integer id);
    @Query("SELECT s FROM Sign s WHERE s.prepod.id = :id AND s.dataSign > :date")
    List<Sign> findActiveSignsByPrepodId(@Param("id") Integer id, @Param("date") LocalDate date);

}
