package com.lufemas.server_bootcamp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.validation.annotation.Validated;

@SpringBootApplication
@Validated
public class ServerBootcamp {

	public static void main(String[] args) {
		SpringApplication.run(ServerBootcamp.class, args);
	}

}
