package com.gantuangcoc98.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gantuangcoc98.backend.models.Jeep;
import com.gantuangcoc98.backend.repositories.JeepRepo;

@Service
public class JeepService {
    
    @Autowired
    private JeepRepo jeepRepo;

    public void addJeep(String jeepCode, List<String> routes) {
        Jeep j = new Jeep();
        j.setJeepCode(jeepCode);
        j.setRoutes(routes);
        jeepRepo.save(j);
    }
    
    public List<Jeep> getAllJeeps() {
        return jeepRepo.findAll();
    }

    public Optional<Jeep> getJeepByCode(String jeep_code) {
        return jeepRepo.findByJeepCode(jeep_code);
    }
}
