package com.qa.project2.controller;

import static org.mockito.Mockito.times;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class MovieControllerUnitTest {

	@Autowired
	MovieController controller;
	
	@MockBean
	private MovieService service;
	
	@Test
	void createTest() {
		Actor actor1 = new Actor("sample", "actor1");
		Actor actor2 = new Actor("sample", "actor2");
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		Movie movie = new Movie("title", "synopsis", 1990, cast, 3.7);
		Movie createdMovie = new Movie(1, "title", "synopsis", 1990, cast, 3.7);
		Mockito.when(service.create(movie)).thenReturn(createdMovie);
		
		AssertEquals(new ResponseEntity<Movie>(createdMovie, HttpStatus.CREATED), controller.create(movie));
		
		Mockito.verify(service, times(1)).create(movie);
	}
	
}
