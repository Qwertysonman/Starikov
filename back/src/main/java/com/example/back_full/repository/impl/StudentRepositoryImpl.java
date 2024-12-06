package com.example.back_full.repository.impl;

import com.example.back_full.model.Student;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Repository
public class StudentRepositoryImpl {
    private List<Student> STUDENTS = new ArrayList<>();
    public List<Student> findAllStudent(){
        return STUDENTS;
    }
    public Student saveStudent(Student student) {
        STUDENTS.add(student);
        return student;
    }
    public Student findByEmail(String email) {
        return STUDENTS.stream().filter(el -> el.getEmail().equals(email)).findFirst().orElse(null);
    }
    public Student updateStudent(Student student) {
        var studentIndax = IntStream.range(0, STUDENTS.size() - 1).filter(index -> STUDENTS.get(index).getEmail().equals(student.getEmail())).findFirst().orElse(-1);
        if (studentIndax > -1){
            STUDENTS.set(studentIndax, student);
            return student;
        }else {
            return null;
        }
    }
    public void deleteStudent(String email) {
        var student = findByEmail(email);
        if (student != null){
            STUDENTS.remove(student);
        }

    }
}
