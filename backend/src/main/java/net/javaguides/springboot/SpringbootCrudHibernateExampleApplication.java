package net.javaguides.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.validation.annotation.Validated;

@SpringBootApplication
@Validated
public class SpringbootCrudHibernateExampleApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootCrudHibernateExampleApplication.class, args);
	}

}
