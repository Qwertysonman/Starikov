package com.example.back_full.service.impl;

import com.example.back_full.model.Student;
import com.example.back_full.repository.FilialRepository;
import com.example.back_full.repository.StudentRepository;
import com.example.back_full.service.StudentService;
import com.example.back_full.util.ExamStatsDTO;
import com.example.back_full.util.PasswordEncoder;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository repository;
    private final PasswordEncoder passwordEncoder;
    private FilialRepository filialrepository;

    @Override
    public List<Student> findAllStudent() {
        return repository.findAll();
    }
    @Override
    public Student saveStudent(Student student) {
        student.setStudPassword(passwordEncoder.encode(student.getStudPassword()));
        return repository.save(student);
    }
    @Override
    public Student findByEmailAndPassword(String email, String password) {
        System.out.println("Я пришел с этими данными в сервис");
        Student student = repository.findStudentByEmail(email);
        System.out.println("Это мы нашли нашего студента только по почте" + student);
        if (student != null && passwordEncoder.matches(password, student.getStudPassword())){
            return student;
        }
        return null;
    }
    @Override
    public Student updateStudent(Student student) {
        Optional<Student> existingStudent = repository.findById(student.getId());
        if (existingStudent.isPresent()) {
            return repository.save(student);
        } else {
            return null;
        }
    }
    @Override
    public Map<String, Integer> statFilials() {
        List<String> filials = new ArrayList<>(filialrepository.findAllFilialsNames());
        List<Integer> numbers = filials.stream().map(el -> filialrepository.statFilials(el)).collect(Collectors.toList());

        HashMap<String, Integer> result = new HashMap<>();
        for (int i = 0; i < filials.size(); i++){
            result.put(filials.get(i), numbers.get(i));
        }

        return result;
    }
    @Override
    public List<ExamStatsDTO> statExamens() {
        // Получаем данные из репозитория
        List<Object[]> rawData = repository.statExamens();

        // Преобразуем массив объектов в список DTO
        return rawData.stream()
                .map(row -> new ExamStatsDTO(
                        ((Number) row[0]).intValue(),
                        ((Number) row[1]).longValue(),
                        (String) row[2]
                ))
                .toList();
    }

    @Override
    public void deleteStudent(String email) {
        repository.deleteStudentByEmail(email);
    }

    @Override
    public Student findStudentByName(String name) {
        return repository.findStudentByFIO(name);
    }

    @Override
    public String findStudentById(Integer id) {
        return repository.findStudentById(id);
    }
}
