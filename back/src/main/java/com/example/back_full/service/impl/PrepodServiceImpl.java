package com.example.back_full.service.impl;

import com.example.back_full.model.Admin;
import com.example.back_full.model.Prepod;
import com.example.back_full.model.PrepodAccount;
import com.example.back_full.repository.PrepodAdminRepository;
import com.example.back_full.repository.PrepodRepository;
import com.example.back_full.service.PrepodService;
import com.example.back_full.util.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PrepodServiceImpl implements PrepodService {
    private final PrepodRepository prepodRepository;
    private final PrepodAdminRepository prepodAdminRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public Integer findPrepodId(String name) {
        return prepodRepository.findPrepodId(name);
    }
    @Override
    public List<String> findAllPrepodsNames() {
        return prepodRepository.findAllPrepodsNames();
    }
    @Override
    public Prepod findPrepodByName(String name) {
        return prepodRepository.findPrepodByName(name);
    }
    @Override
    public List<Prepod> findAllPrepods() {
        return prepodRepository.findAll();
    }
    @Override
    public Prepod newPrepod(Prepod prepod) {
        return prepodRepository.save(prepod);
    }
    @Override
    public Prepod updatePrepod(Prepod prepod) {
        Optional<Prepod> existingPrepod = prepodRepository.findById(prepod.getId());
        if (existingPrepod.isPresent()) {
            return prepodRepository.save(prepod);
        } else {
            return null;
        }
    }
    @Override
    public void deletePrepodById(Integer id) {
        prepodRepository.deleteById(id);
    }
    @Override
    public Prepod findPrepodByEmail(String email) {
        return prepodRepository.findPrepodByEmail(email);
    }
    @Override
    public Prepod findByEmailAndPassword(String email, String password) {
        Prepod prepod = prepodRepository.findPrepodByEmail(email);
        PrepodAccount prepodAccount = prepodAdminRepository.findPrepodByEmail(email);
        if (prepod != null && passwordEncoder.matches(password, prepodAccount.getStudPassword())){
            return prepod;
        }
        return null;
    }
}
