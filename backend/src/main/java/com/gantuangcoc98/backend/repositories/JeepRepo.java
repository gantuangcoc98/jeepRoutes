package com.gantuangcoc98.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gantuangcoc98.backend.models.Jeep; 

public interface JeepRepo extends JpaRepository<Jeep, Long> {
    Optional<Jeep> findByJeepCode(String jeep_code);
}
