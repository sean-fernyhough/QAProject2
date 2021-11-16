package com.qa.project2.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	
	
}
