package com.gantuangcoc98.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.gantuangcoc98.backend.models.Jeep;
import com.gantuangcoc98.backend.services.JeepService;

@RestController
public class JeepController {
    
    @Autowired
    private JeepService jeepService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path="addJeep")
    private void addJeep(@RequestBody Jeep j) {
        jeepService.addJeep(j.getJeepCode(), j.getRoutes());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("search")
    public List<String> searchJeep(@RequestParam("code") String jeep_code) {
        Optional<Jeep> jeepOptional = jeepService.getJeepByCode(jeep_code);
        return jeepOptional.map(Jeep::getRoutes).orElse(null);
    }
}
