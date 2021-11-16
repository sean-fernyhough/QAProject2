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
		
		Mockito.when(repo.findById(1l).get()).thenReturn(movie);
		Mockito.when(repo.saveAndFlush(updatedMovie)).thenReturn(updatedMovie);
		
		Assertions.assertEquals(updatedMovie, service.update(1l, updatedMovie));
		
		Mockito.verify(repo, times(1)).findById(1);
		Mockito.verify(repo, times(1)).saveAndFlush(movie);
	}
	
	@Test
	void deleteTest() {
		
		Mockito.when(repo.existsById(1l)).thenReturn(true, false);
		
		Assertions.assertEquals(true, service.delete(1l));
		
		Mockito.verify(repo, times(1)).deleteById(1l);
		Mockito.verify(repo, times(2)).existsById(1l);
	}
	
	@Test
	void readAllTest() {
		Actor actor1 = new Actor("sample", "actor1");
		Actor actor2 = new Actor("sample", "actor2");
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", "synopsis", 1990, cast, 3.7);
		Movie movie2 = new Movie(1l, "title2", "synopsis2", 1999, cast, 4.9);
		List<Movie> movies = new ArrayList<Movie>();
		
		
		Mockito.when(repo.findAll()).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAll());
		
		Mockito.verify(repo, times(1)).findAll();
	}

	@Test
	void readAllByTitleTest() {
		Actor actor1 = new Actor("sample", "actor1");
		Actor actor2 = new Actor("sample", "actor2");
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", "synopsis", 1990, cast, 3.7);
		Movie movie2 = new Movie(1l, "title", "synopsis2", 1999, cast, 4.9);
		List<Movie> movies = new ArrayList<Movie>();
		
		
		Mockito.when(repo.findAllByTitle("title")).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAllByTitle("title"));
		
		Mockito.verify(repo, times(1)).findAllByTitle();
	}
	
	@Test
	void readAllByYearTest() {
		Actor actor1 = new Actor("sample", "actor1");
		Actor actor2 = new Actor("sample", "actor2");
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", "synopsis", 1990, cast, 3.7);
		Movie movie2 = new Movie(1l, "title2", "synopsis2", 1990, cast, 4.9);
		List<Movie> movies = new ArrayList<Movie>();
		
		
		Mockito.when(repo.findAllByYear(1990)).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAllByTitle(1990));
		
		Mockito.verify(repo, times(1)).findAllByYear();
	}
	
}
