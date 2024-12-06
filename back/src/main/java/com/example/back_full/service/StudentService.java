package com.example.back_full.service;

import com.example.back_full.model.Student;
import com.example.back_full.util.ExamStatsDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface StudentService {
    List<Student> findAllStudent();
    Student saveStudent(Student student);
    Student findByEmailAndPassword(String email, String password);
    Student updateStudent(Student student);
    Map<String, Integer> statFilials();
    List<ExamStatsDTO> statExamens();
    @Transactional
    void deleteStudent(String email);
    Student findStudentByName(String name);
    String findStudentById(Integer id);
}
