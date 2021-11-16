package com.qa.project2.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.qa.project2.domain.Movie;
import com.qa.project2.exceptions.MovieNotFoundException;
import com.qa.project2.repo.MovieRepo;

@Service
public class MovieService {

	private MovieRepo repo;
	
	MovieService(MovieRepo repo) {
		this.repo = repo;
	}
	
	public Movie create(Movie movie) {
		return repo.saveAndFlush(movie);
	}
	
	public List<Movie> readAll() {
		return repo.findAll();
	}
	
	public Movie update(long id, Movie movie) {
		Movie existing = repo.findById(id).orElseThrow(MovieNotFoundException::new);
		existing.setTitle(movie.getTitle());
		existing.setSynopsis(movie.getSynopsis());
		existing.setRating(movie.getRating());
		existing.setRuntime(movie.getRuntime());
		existing.setYear(movie.getYear());
		existing.setCast(movie.getCast());
		return repo.saveAndFlush(existing);
	}
	
	public boolean delete(long id) {
		if (!repo.existsById(id)){throw new MovieNotFoundException();};
		repo.deleteById(id);
		return !repo.existsById(id);
	}
	
}
