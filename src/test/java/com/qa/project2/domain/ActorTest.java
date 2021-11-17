package com.qa.project2.domain;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import nl.jqno.equalsverifier.EqualsVerifier;

@SpringBootTest
public class ActorTest {

	@Test
	void ActorEqualsTest() {
		EqualsVerifier.simple().forClass(Actor.class).withPrefabValues(Movie.class, new Movie("title", 1990, 120, null, "synopsis", 3.7), new Movie("title2", 1990, 120, null, "synopsis", 3.7)).verify();
	}
}
