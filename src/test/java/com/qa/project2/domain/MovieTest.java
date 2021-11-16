package com.qa.project2.domain;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import nl.jqno.equalsverifier.EqualsVerifier;

public class MovieTest {

	@SpringBootTest
	public class UserTest {

		@Test
		void userEqualsTest() {
		
		EqualsVerifier.simple().forClass(Movie.class).verify();
		}
	}
	
}
