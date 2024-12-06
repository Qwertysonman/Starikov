package com.example.back_full.controller;

import com.example.back_full.model.Prepod;
import com.example.back_full.model.Sign;
import com.example.back_full.model.Student;
import com.example.back_full.service.PracticeService;
import com.example.back_full.service.SignService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/signs")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SignController {
    private final SignService signService;
    private final PracticeService practiceService;


    // вывод всех активных записей студента
    @PostMapping("/find_active")
    public ResponseEntity<List<Sign>> getActiveSignsById(@RequestBody Student student){
        List<Sign> signs = signService.findSignsByStudentId(student.getId());
        return ResponseEntity.ok(signs);
    }
    // поиск активных записей по преподавателю
    @PostMapping("find_active_by_prepod")
    public ResponseEntity<List<Sign>> getActiveSignsByPrepodId(@RequestBody Prepod prepod){
        List<Sign> signs = signService.findActiveSignsByPrepodId(prepod.getId());
        return ResponseEntity.ok(signs);
    }

    // вывод пройденых занятий по теории и практике
    @PostMapping("/stat_count_sign")
    public ResponseEntity<List<Integer>> getNumOfSign(@RequestBody Student student){
        List<Integer> listik = new ArrayList<>(2);
        Integer signs_teory = signService.getNumOfSignTeory(student.getId());
        Integer signs_practce = signService.getNumOfSignPrac(student.getId());
        listik.add(signs_teory);
        listik.add(signs_practce);
        return ResponseEntity.ok(listik);
    }
    // вывод всех записей студента
    @PostMapping("/find_all_history")
    public ResponseEntity<List<Sign>> getAllSignsById(@RequestBody Student student) {
        List<Sign> signs = signService.findAllSignsByStudentId(student.getId());
        return ResponseEntity.ok(signs);
    }
    // создание новой записи (успешно)
    @PostMapping("/new_sign")
    public Sign saveSign(@RequestBody Sign sign){
        System.out.println("В МЕНЯ ПЫТАЮСТСЯ ЗАПИХНУТЬ ЭТО ПОМОГИТЕЕЕЕ");
        System.out.println(sign);
        return signService.saveSign(sign);
    }
    // изменение записи
    @PutMapping("/update_sign")
    public ResponseEntity<Sign> updateSign(@RequestBody Sign sign) {
        Sign updatedSign = signService.updateSign(sign);
        return ResponseEntity.ok(updatedSign);
    }
    // удаление записи
    @PostMapping("/delete_sign")
    public void deleteSign(@RequestBody Map<String, Integer> delitik) {
        Integer id = delitik.get("id");
        signService.deleteSign(id);
    }
    @GetMapping("/find_next")
    public Integer findNext(){
        return signService.findNext();
    }

    // Выводим список доступных слотов для записи на конкретных условиях
    @PostMapping("/available")
    public ResponseEntity<List<String>> getAvailableTimeSlots(@RequestBody Map<String, String> requestBody){
        System.out.println("Меня хотят ооооооооооооооооооооооооооооооооооооооооооооооо");
        String fio = requestBody.get("fio");
        String typeLesson = requestBody.get("typeLesson");
        LocalDate date = LocalDate.parse(requestBody.get("date"));

        int dayWeak = date.getDayOfWeek().getValue();
        System.out.println(dayWeak);
        System.out.println(fio);
        System.out.println(typeLesson);
        System.out.println(date);

        List<Integer> place = practiceService.getPlaceByPrepodFIOAndTypeLessonAndDayWeak(fio, typeLesson, dayWeak); // список из мест который впринципе доступны на данную запись
        List<String> alltimeSlots = practiceService.getAlltimeSlots(fio, typeLesson, dayWeak); // находит все слоты по заданным условиям (просто все что ыпринципе есть)
        List<String> timeSlots = signService.findTimeSlotsByPrepodFIOAndTypeLessonAndDate(fio, typeLesson, date); // находит те слоты которые заняты на этот день

        Map<String, Integer> countMap = new HashMap<>();
        for(String slot : timeSlots){
            countMap.put(slot, countMap.getOrDefault(slot, 0) + 1);
        }

        List<String> availableTimeSlots = new ArrayList<>();
        for(int i = 0; i < alltimeSlots.size(); i++){
            String slotik = alltimeSlots.get(i);
            Integer placik = place.get(i);
            Integer factik = countMap.getOrDefault(slotik, 0);

            if (factik < placik){
                availableTimeSlots.add(slotik);
            }
        }
        System.out.println(availableTimeSlots);

        return ResponseEntity.ok(availableTimeSlots);
    }
}