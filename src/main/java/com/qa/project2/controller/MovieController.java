package com.qa.project2.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Movie> update(@PathVariable long id, @RequestBody Movie movie){
		return new ResponseEntity<Movie>(service.update(id, movie), HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<Movie>> readAll(){
		return new ResponseEntity<List<Movie>>(service.readAll(), HttpStatus.OK);
	}
	
	@GetMapping("/get/title/{title}")
	public ResponseEntity<List<Movie>> readAllByTitle(@PathVariable String title){
		return new ResponseEntity<List<Movie>>(service.readAllByTitle(title), HttpStatus.OK);
	}
	
	@GetMapping("/get/cast/{cast}")
	public ResponseEntity<List<Movie>> readAllByCast(@PathVariable String cast){
		return new ResponseEntity<List<Movie>>(service.readAllByCast(cast), HttpStatus.OK);
	}
	
	@GetMapping("/get/year/{year}")
	public ResponseEntity<List<Movie>> readAllByYear(@PathVariable int year){
		return new ResponseEntity<List<Movie>>(service.readAllByYear(year), HttpStatus.OK);
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Movie> delete(@PathVariable long id){
		return service.delete(id)? new ResponseEntity<Movie>(HttpStatus.NO_CONTENT):new ResponseEntity<Movie>(HttpStatus.NOT_FOUND);
	}
	
	
}
