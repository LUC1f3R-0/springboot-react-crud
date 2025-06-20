package com.example.demo;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.load();

        System.setProperty("DB_PORT", dotenv.get("DB_PORT"));
        System.setProperty("DB_URL", dotenv.get("DB_URL"));
        System.setProperty("USER_NAME", dotenv.get("USER_NAME"));
        System.setProperty("USER_PASS", dotenv.get("USER_PASS"));
        System.setProperty("DDL_AUTO", dotenv.get("DDL_AUTO"));
        System.setProperty("SECRET_KEY", dotenv.get("SECRET_KEY"));
        SpringApplication.run(DemoApplication.class, args);
    }

}
