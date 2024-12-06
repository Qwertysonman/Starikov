package com.example.back_full.controller;

import com.example.back_full.model.Practice;
import com.example.back_full.model.Prepod;
import com.example.back_full.service.PracticeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/practices")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PracticeController {
    private final PracticeService practiceService;

    @PostMapping("/find_all_practices")
    public List<Practice> getAllPractices(){
        return practiceService.getAllPractices();
    }
    @PostMapping("/new_practice")
    public Practice newPrepod(@RequestBody Practice practice){
        return practiceService.newPractice(practice);
    }
    @PutMapping("/update_practice")
    public Practice updatePractice(@RequestBody Practice practice){
        return practiceService.updatePractice(practice);
    }
    @DeleteMapping("/delete_practice")
    public void deletePractice(@RequestBody Practice practice){
        Integer id = practice.getId();
        practiceService.deletePracticeById(id);
    }
    @PostMapping("/find_by_prepod_id")
    public List<Practice> getPracticesByPrepodId(@RequestBody Prepod prepod){
        Integer id = prepod.getId();
        return practiceService.getPracticesByPrepodId(id);
    }

}


