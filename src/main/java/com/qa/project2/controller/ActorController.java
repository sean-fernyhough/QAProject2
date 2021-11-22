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

import com.qa.project2.domain.Actor;
import com.qa.project2.service.ActorService;

@RestController
@RequestMapping("/actors")
public class ActorController {

	private ActorService service;
	
	public ActorController(ActorService service) {
		this.service = service;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Actor> create(@RequestBody Actor actor){
		return new ResponseEntity<Actor>(this.service.create(actor), HttpStatus.CREATED);
	}
	
	@GetMapping("/get")
	public ResponseEntity<List<Actor>> readAll(){
		return new ResponseEntity<List<Actor>>(this.service.readAll(), HttpStatus.OK);
	}
	
	@GetMapping("/get/id/{id}")
	public ResponseEntity<Actor> readById(@PathVariable long id){
		return new ResponseEntity<Actor>(this.service.readById(id), HttpStatus.OK);
	}
	
	@GetMapping("/get/{name}")
	public ResponseEntity<List<Actor>> readAllByName(@PathVariable String name){
		return new ResponseEntity<List<Actor>>(this.service.readByName(name), HttpStatus.OK);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Actor> update(@PathVariable long id, @RequestBody Actor actor){
		return new ResponseEntity<Actor>(this.service.update(id, actor), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Actor> delete(@PathVariable long id){
		return this.service.delete(id)? new ResponseEntity<Actor>(HttpStatus.NO_CONTENT):new ResponseEntity<Actor>(HttpStatus.NOT_FOUND);
	}
	
	
	
}
