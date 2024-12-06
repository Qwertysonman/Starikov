package com.example.back_full.service;

import com.example.back_full.model.Sign;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface SignService {
    List<Sign> findSignsByStudentId(int studentId);
    List<Sign> findAllSignsByStudentId(int studentId);
    List<Sign> findActiveSignsByPrepodId(int prepodId);
    Sign saveSign(Sign sign);
    @Transactional
    void deleteSign(int id);
    Sign updateSign(Sign sign);
    Integer findNext();
    Integer getNumOfSignTeory(Integer id);
    Integer getNumOfSignPrac(Integer id);
    List<String> findTimeSlotsByPrepodFIOAndTypeLessonAndDate(String fio, String typeLesson, LocalDate date);
    boolean isTimeSlotAvailable(String timeSlot, LocalDate date, int place);
    List<Sign> findSignsByStudentEmailAndType(String email, String typeSign);

}
