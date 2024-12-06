package com.example.back_full.controller;

import com.example.back_full.model.Filial;
import com.example.back_full.model.Student;
import com.example.back_full.service.FilialService;
import com.example.back_full.service.StudentService;
import com.example.back_full.util.ExamStatsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/students")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    private final StudentService service;
    private final FilialService filialservice;
    private final ObjectMapper objectMapper;

    // Вывод всех студентов
    @GetMapping("/get_all")
    public List<Student> findAllStudent(){
        return service.findAllStudent();
    }

    @PostMapping("get_student_by_name")
    public Student findStudentByName(@RequestBody Map<String, String> name_map){
        String name = name_map.get("name");
        return service.findStudentByName(name);
    }
    // Сохранение нового студента (регистрация) (успешно)
    @PostMapping("/register")
    public ResponseEntity<Student> saveStudent(@RequestBody Map<String, Object> request){
        Student student = objectMapper.convertValue(request.get("student"), Student.class);
        String filial_name = (String) request.get("filial_name");
        Filial filial = filialservice.findFilialByName(filial_name);
        student.setFilial(filial);
        student.setIdFilial(filial.getId());
        student.setBalans(0);
        student.setStatePractic("Не сдано");
        student.setStateTeory("Не сдано");
        return ResponseEntity.ok(service.saveStudent(student));
    }
    // Поиск студента по почте и паролю (логирование)
    @PostMapping("/login")
    public ResponseEntity<Student> findByEmailAndPassword(@RequestBody Map<String, String> credentials){
        String email = credentials.get("email");
        String password = credentials.get("studPassword");
        System.out.println("Это мой email: " + email);
        System.out.println("Это мой пароль: " + password);
        Student student = service.findByEmailAndPassword(email, password);
        if (student != null){
            return ResponseEntity.ok(student);
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    // Редактирование пользователя
    @PutMapping("/update")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        Student updatestudent = service.updateStudent(student);
        if (updatestudent != null) {
            return ResponseEntity.ok(updatestudent);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/get_name_by_id")
    public String findStudentByID(@RequestBody Map<String, Integer> name_map){
        Integer id = name_map.get("id");
        return service.findStudentById(id);
    }
    // Удаление пользователя (наверное не использовать)
    @DeleteMapping("/delete_student")
    public void deleteStudent(@RequestBody Map<String, String> request) {
        service.deleteStudent(request.get("email"));
    }

    // Поиск колличества пользователей по филиалам
    @GetMapping("/stat_filials")
    public ResponseEntity<Map<String, Integer>> statFilials(){
        return ResponseEntity.ok(service.statFilials());
    }

    @GetMapping("/stat_examens")
    public ResponseEntity<List<ExamStatsDTO>> statExamens() {
        // Вызываем сервисный метод и возвращаем результат
        return ResponseEntity.ok(service.statExamens());
    }
}
