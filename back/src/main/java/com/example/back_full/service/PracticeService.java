package com.example.back_full.service;

import com.example.back_full.model.Practice;

import java.util.List;

public interface PracticeService {
    List<Integer> getPlaceByPrepodFIOAndTypeLessonAndDayWeak(String fio, String typeLesson, int dayWeak);
    List<String> getAlltimeSlots(String fio, String typeLesson, int datWeak);
    List<Practice> getAllPractices();
    Practice newPractice(Practice practice);
    Practice updatePractice(Practice practice);
    void deletePracticeById(Integer id);
    List<Practice> getPracticesByPrepodId(Integer id);
}
