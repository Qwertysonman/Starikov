package com.example.back_full.repository;

import com.example.back_full.model.Practice;
import com.example.back_full.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    void deleteStudentByEmail(String email);
    Student findStudentByEmail(String email);

    Student findStudentByFIO(String fio);
    @Query("SELECT s.FIO FROM Student s WHERE s.id = :id")
    String findStudentById(@Param("id") Integer id);

    @Query(value = """
        SELECT 
            CASE 
                WHEN last_attempt.result = 'Pass' THEN attempt_stats.attempt_count
                ELSE 0
            END AS attempt_number,
            COUNT(DISTINCT last_attempt.id_student) AS students_count,
            last_attempt.type_examen
        FROM 
            Examens last_attempt
        JOIN (
            SELECT 
                id_student, 
                type_examen, 
                MAX(id) AS last_attempt_id, 
                COUNT(*) AS attempt_count 
            FROM 
                Examens
            GROUP BY 
                id_student, 
                type_examen
        ) AS attempt_stats
        ON last_attempt.id = attempt_stats.last_attempt_id
        GROUP BY 
            last_attempt.type_examen,
            CASE 
                WHEN last_attempt.result = 'Pass' THEN attempt_stats.attempt_count
                ELSE 0
            END
        ORDER BY 
            last_attempt.type_examen,
            attempt_number
        """, nativeQuery = true)
    List<Object[]> statExamens();
}
