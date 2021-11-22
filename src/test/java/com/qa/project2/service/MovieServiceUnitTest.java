package com.qa.project2.service;

import static org.mockito.Mockito.times;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.qa.project2.domain.Actor;
import com.qa.project2.domain.Movie;
import com.qa.project2.repo.MovieRepo;

@SpringBootTest
public class MovieServiceUnitTest {

	@MockBean
	private MovieRepo repo;

	@Autowired
	MovieService service;

	@Test
	void createTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);
		Movie createdMovie = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		
		Mockito.when(repo.saveAndFlush(movie)).thenReturn(createdMovie);
		
		Assertions.assertEquals(createdMovie, service.create(movie));
		
		
		Mockito.verify(repo, times(1)).saveAndFlush(movie);
	}
	
	@Test
	void updateTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);
		Movie updatedMovie = new Movie(1l, "updatedTitle", 1990, 120, cast, "synopsis", 3.7);
		
		Mockito.when(repo.findById(1l)).thenReturn(Optional.of(movie));
		Mockito.when(repo.saveAndFlush(updatedMovie)).thenReturn(updatedMovie);
		
		Assertions.assertEquals(updatedMovie, service.update(1l, updatedMovie));
		
		Mockito.verify(repo, times(1)).findById(1l);
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
	void addImage() throws IOException{
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);

		
		MultipartFile file = new MockMultipartFile("file.jpg", new byte[1]);
		
		Mockito.when(repo.findById(1l)).thenReturn(Optional.of(movie));
		Mockito.when(repo.saveAndFlush(movie)).thenReturn(movie);
		
		Assertions.assertEquals(movie, service.addImage(1l, file));
	}
	
	@Test
	void readByIdTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie = new Movie("title", 1990, 120, cast, "synopsis", 3.7);

		Mockito.when(repo.findById(1l)).thenReturn(Optional.of(movie));
		
		Assertions.assertEquals(movie, service.readById(1l));

		
	}
	
	@Test
	void readAllTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l,"title2", 1999, 120, cast, "synopsis", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(repo.findAll()).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAll());
		
		Mockito.verify(repo, times(1)).findAll();
	}

	@Test
	void readAllByTitleTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l, "title", 1999, 120, cast, "synopsis2", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(repo.findAllByTitle("title")).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAllByTitle("title"));
		
		Mockito.verify(repo, times(1)).findAllByTitle("title");
	}
	
	@Test
	void readAllByYearTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l, "title2", 1990, 120, cast, "synopsis2", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(repo.findAllByYear(1990)).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAllByYear(1990));
		
		Mockito.verify(repo, times(1)).findAllByYear(1990);
	}
	
	@Test
	void readAllByCastTest() {
		Actor actor1 = new Actor("sample", "actor1", null);
		Actor actor2 = new Actor("sample", "actor2", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);

		Movie movie1 = new Movie(1l, "title", 1990, 120, cast, "synopsis", 3.7);
		Movie movie2 = new Movie(2l, "title2", 1999, 120, cast, "synopsis2", 4.8);
		List<Movie> movies = new ArrayList<Movie>();
		movies.add(movie1);
		movies.add(movie2);
		
		Mockito.when(repo.findAllByName("sample actor1")).thenReturn(movies);

		Assertions.assertEquals(movies, service.readAllByCast("sample actor1"));
		
		Mockito.verify(repo, times(1)).findAllByName("sample actor1");
	}
	
}
