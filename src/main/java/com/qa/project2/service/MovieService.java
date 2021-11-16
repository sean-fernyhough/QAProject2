package com.qa.project2.service;

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
	
	
	
}
