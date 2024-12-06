package com.example.back_full.service.impl;

import com.example.back_full.model.Practice;
import com.example.back_full.model.Prepod;
import com.example.back_full.repository.PracticeRepository;
import com.example.back_full.service.PracticeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PracticeServiceImpl implements PracticeService {
    private final PracticeRepository practiceRepository;
    public List<Integer> getPlaceByPrepodFIOAndTypeLessonAndDayWeak(String fio, String typeLesson, int dayWeak) {
        return practiceRepository.findPlaceByPrepodFIOAndTypeLessonAndDayWeak(fio, typeLesson, dayWeak);
    }
    public List<String> getAlltimeSlots(String fio, String typeLesson, int datWeak) {
        return practiceRepository.findAlltimeSlots(fio, typeLesson, datWeak);
    }
    @Override
    public List<Practice> getAllPractices() {
        return practiceRepository.findAll();
    }
    @Override
    public Practice newPractice(Practice practice) {
        return practiceRepository.save(practice);
    }
    @Override
    public Practice updatePractice(Practice practice) {
        Optional<Practice> existingPractice = practiceRepository.findById(practice.getId());
        if (existingPractice.isPresent()) {
            return practiceRepository.save(practice);
        } else {
            return null;
        }
    }
    @Override
    public void deletePracticeById(Integer id) {
        practiceRepository.deleteById(id);
    }

    @Override
    public List<Practice> getPracticesByPrepodId(Integer id) {
        return practiceRepository.getPracticesByPrepodId(id);
    }
}
