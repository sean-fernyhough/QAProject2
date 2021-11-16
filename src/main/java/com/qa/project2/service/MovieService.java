package com.qa.project2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.qa.project2.domain.Movie;
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
	
}
