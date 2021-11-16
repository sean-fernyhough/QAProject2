package com.qa.project2.controller;

import static org.mockito.Mockito.times;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ActorControllerUnitTest {

	@Autowired
	ActorController controller;
	
	@MockBean
	private ActorService service;
	
	@Test
	void createTest() {
		Actor actor = new Actor("sample", "actor1");
		
		Mockito.when(service.create(actor)).thenReturn(actor);
		
		AssertEquals(new ResponseEntity<Movie>(createdMovie, HttpStatus.CREATED), controller.create(movie));
		
		Mockito.verify(service, times(1)).create(movie);
	
}
