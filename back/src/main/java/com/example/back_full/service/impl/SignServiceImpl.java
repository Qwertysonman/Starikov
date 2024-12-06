package com.example.back_full.service.impl;

import java.time.LocalDate;
import com.example.back_full.model.Sign;
import com.example.back_full.repository.SignRepository;
import com.example.back_full.service.SignService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class SignServiceImpl implements SignService {
    private final SignRepository signRepository;

    @Override
    public List<Sign> findSignsByStudentId(int studentId) {
        LocalDate currentDate = LocalDate.now();
        return signRepository.findByStudentId(studentId, currentDate);
    }
    @Override
    public List<Sign> findAllSignsByStudentId(int studentId) {
        return signRepository.findAllByStudentId(studentId);
    }
    @Override
    public List<Sign> findActiveSignsByPrepodId(int prepodId) {
        LocalDate currentDate = LocalDate.now();
        return signRepository.findActiveSignsByPrepodId(prepodId, currentDate);
    }
    public Integer findNext(){
        return signRepository.findNext();
    }
    @Override
    public Integer getNumOfSignTeory(Integer id) {
        LocalDate currentDate = LocalDate.now();
        return signRepository.getNumOfSign("Теория", id, currentDate);
    }

    @Override
    public Integer getNumOfSignPrac(Integer id) {
        LocalDate currentDate = LocalDate.now();
        return signRepository.getNumOfSign("Практика", id, currentDate);
    }

    @Override
    public Sign saveSign(Sign sign) {
        return signRepository.save(sign);
    }

    @Override
    public void deleteSign(int id) {
        signRepository.deleteSignById(id);
    }

    @Override
    public Sign updateSign(Sign sign) {
        return signRepository.save(sign);
    }

    // Новый метод для получения списка time_slot по FIO преподавателя, type_lesson и дате
    public List<String> findTimeSlotsByPrepodFIOAndTypeLessonAndDate(String fio, String typeLesson, LocalDate date) {
        return signRepository.findTimeSlotsByPrepodFIOAndTypeLessonAndDate(fio, typeLesson, date);
    }

    // Новый метод для проверки доступности time_slot
    public boolean isTimeSlotAvailable(String timeSlot, LocalDate date, int place) {
        int currentCount = signRepository.countSignsByTimeSlotAndDate(timeSlot, date);
        return currentCount < place;
    }
    public List<Sign> findSignsByStudentEmailAndType(String email, String typeSign) {
        return signRepository.findSignsByStudentEmailAndType(email, typeSign);
    }
}
