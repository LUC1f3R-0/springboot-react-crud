package com.example.demo;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DBCheck {

    private final DataSource dataSource;

    public DBCheck(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @PostConstruct
    public void connectionChecker() {
        try {
            System.out.println("DATABASE CONNECTION???");
            if (dataSource.getConnection().isValid(1000)) {
                System.out.println("SUCCESS");
            } else {
                System.out.println("FAIL");
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
