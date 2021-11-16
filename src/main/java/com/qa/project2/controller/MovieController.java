package com.qa.project2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.project2.domain.Movie;
import com.qa.project2.service.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieController {

	private MovieService service;
	
	MovieController(MovieService service){
		this.service = service;
	}

	@PostMapping("/create")
	public ResponseEntity<Movie> create(@RequestBody Movie movie){
		return new ResponseEntity<Movie>(service.create(movie), HttpStatus.CREATED);
	}
}
