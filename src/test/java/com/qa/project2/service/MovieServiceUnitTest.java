package com.qa.project2.service;

import static org.mockito.Mockito.times;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.project2.controller.Actor;
import com.qa.project2.controller.Movie;

@SpringBootTest
public class MovieServiceUnitTest {

	@MockBean
	private MovieRepo repo;

	@Autowired
	MovieService service;

	@Test
	void createTest() {
		Actor actor1 = new Actor("sample", "actor1");
		Actor actor2 = new Actor("sample", "actor2");
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie = new Movie("title", "synopsis", 1990, cast, 3.7);
		Movie createdMovie = new Movie(1l, "title", "synopsis", 1990, cast, 3.7);
		
		Mockito.when(repo.saveAndFlush(movie)).thenReturn(createdMovie);
		
		Assertions.assertEquals(createdMovie, service.create(movie));
		
		
		Mockito.verify(repo, times(1)).saveAndFlush(movie);
	}
	
	@Test
	void updateTest() {
		Actor actor1 = new Actor("sample", "actor1");
		Actor actor2 = new Actor("sample", "actor2");
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie = new Movie(1l, "title", "synopsis", 1990, cast, 3.7);
		Movie updatedMovie = new Movie(1l, "updatedTitle", "synopsis", 1990, cast, 3.7);
		
		Mockito.when(repo.findById(1).get()).thenReturn(movie);
		Mockito.when(repo.saveAndFlush(updatedMovie)).thenReturn(updatedMovie);
		
		Assertions.assertEquals(updatedMovie, service.update(1l, updatedMovie));
		
		Mockito.verify(repo, times(1)).findById(1);
		Mockito.verify(repo, times(1)).saveAndFlush(movie);
	}
}
