package com.qa.project2.domain;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import nl.jqno.equalsverifier.EqualsVerifier;

@SpringBootTest
public class MovieTest {

	@Test
	void MovieEqualsTest() {

		EqualsVerifier.simple().forClass(Movie.class).verify();
	}

}
