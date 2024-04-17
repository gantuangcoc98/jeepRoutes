package com.gantuangcoc98.backend.models;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tblJeep")
public class Jeep {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "jeep_id")
    private long jeep_id;

    @Column(name = "jeepCode")
    private String jeepCode;

    @Column(name = "routes", columnDefinition = "TEXT")
    private String routes;
    
    public Jeep(String jeepCode, List<String> routes) {
        this.jeepCode = jeepCode;
        setRoutes(routes);
    }

    public List<String> getRoutes() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(routes, List.class); // Deserialize JSON string to List
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void setRoutes(List<String> routes) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            this.routes = objectMapper.writeValueAsString(routes); // Serialize List to JSON string
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
