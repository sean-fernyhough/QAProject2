package com.qa.project2.service;

import static org.mockito.Mockito.times;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class ActorServiceUnitTest {
	@MockBean
	private ActorRepo repo;
	
	@Autowired
	ActorService service;
	
	@Test
	void createTest() {
		void createTest() {
			Actor actor = new Actor("sample", "actor");
			Actor createdActor = new Actor(1l, "sample", "actor");
			
			Mockito.when(repo.saveAndFlush(actor)).thenReturn(createdActor);
			
			Assertions.assertEquals(createdActor, service.create(actor));
			
			
			Mockito.verify(repo, times(1)).saveAndFlush(actor);
	}
}
