package com.qa.project2.controller;

import static org.mockito.Mockito.times;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.qa.project2.domain.Actor;
import com.qa.project2.domain.Movie;
import com.qa.project2.service.MovieService;

@SpringBootTest
public class MovieControllerUnitTest {

	@Autowired
	MovieController controller;
	
	@MockBean
	private MovieService service;
	
	@Test
	void createTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);
		Movie createdMovie = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Mockito.when(service.create(movie)).thenReturn(createdMovie);
		
		Assertions.assertEquals(new ResponseEntity<Movie>(createdMovie, HttpStatus.CREATED), controller.create(movie));
		
		Mockito.verify(service, times(1)).create(movie);
	}
	
	@Test
	void readAllTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		
		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l, "title", 2002, 93, cast, "synopsis", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(service.readAll()).thenReturn(movies);
		
		Assertions.assertEquals(new ResponseEntity<List<Movie>>(movies, HttpStatus.OK), controller.readAll());
		
		Mockito.verify(service, times(1)).readAll();
	}
	
	@Test
	void updateTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);
		Movie updatedMovie = new Movie(1l, "updated", 1990, 120, cast, "movie", 3.7);
		Mockito.when(service.update(1l, movie)).thenReturn(updatedMovie);
		
		Assertions.assertEquals(new ResponseEntity<Movie>(updatedMovie, HttpStatus.ACCEPTED), controller.update(1l, movie));
		
		Mockito.verify(service, times(1)).update(1l, movie);
	}
	
	@Test
	void readByIdTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);
		Mockito.when(service.readById(1l)).thenReturn(movie);
		
		Assertions.assertEquals(new ResponseEntity<Movie>(movie, HttpStatus.OK), controller.readById(1l));
		
		Mockito.verify(service, times(1)).readById(1l);
	}
	
	@Test
	void imageUploadTest() throws IOException {
		
		MultipartFile file = null;
		
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);
		Mockito.when(service.addImage(1l, file)).thenReturn(movie);
		
		Assertions.assertEquals(new ResponseEntity<Movie>(movie, HttpStatus.CREATED), controller.imageUpload(1l, file));
		
		Mockito.verify(service, times(1)).addImage(1l, file);
	}

	@Test
	void deleteTest() {

		Mockito.when(service.delete(1l)).thenReturn(true);
		
		Assertions.assertEquals(new ResponseEntity<Movie>(HttpStatus.NO_CONTENT), controller.delete(1l));
		
		Mockito.verify(service, times(1)).delete(1l);
	}
	
	@Test
	void readAllByTitleTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		
		Movie movie = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie);
		
		Mockito.when(service.readAllByTitle("title")).thenReturn(movies);
		
		Assertions.assertEquals(new ResponseEntity<List<Movie>>(movies, HttpStatus.OK), controller.readAllByTitle("title"));
		
		Mockito.verify(service, times(1)).readAllByTitle("title");
	}
	
	@Test
	void readAllByYearTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		
		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l, "title2", 1990, 120, cast, "synopsis", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(service.readAllByYear(1990)).thenReturn(movies);
		
		Assertions.assertEquals(new ResponseEntity<List<Movie>>(movies, HttpStatus.OK), controller.readAllByYear(1990));
		
		Mockito.verify(service, times(1)).readAllByYear(1990);
	}
	
	@Test
	void readAllByCastTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		
		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l, "title", 1990, 120, cast, "synopsis", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(service.readAllByCast(actor1.getFirstName() + " " +actor1.getLastName())).thenReturn(movies);
		
		Assertions.assertEquals(new ResponseEntity<List<Movie>>(movies, HttpStatus.OK), controller.readAllByCast(actor1.getFirstName() + " " +actor1.getLastName()));
		
		Mockito.verify(service, times(1)).readAllByCast(actor1.getFirstName() + " " +actor1.getLastName());
	}
	
}
