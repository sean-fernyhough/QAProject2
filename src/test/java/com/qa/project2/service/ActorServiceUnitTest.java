package com.qa.project2.service;

import static org.mockito.Mockito.times;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.project2.domain.Actor;
import com.qa.project2.repo.ActorRepo;

@SpringBootTest
public class ActorServiceUnitTest {
	@MockBean
	private ActorRepo repo;
	
	@Autowired
	ActorService service;
	
	@Test
		void createTest() {
			Actor actor = new Actor("sample", "actor", null);
			Actor createdActor = new Actor(1l, "sample", "actor", null);
			
			Mockito.when(repo.saveAndFlush(actor)).thenReturn(createdActor);
			
			Assertions.assertEquals(createdActor, service.create(actor));
			
			
			Mockito.verify(repo, times(1)).saveAndFlush(actor);
	}
		
		@Test
		void updateTest() {
			Actor actor = new Actor(1l, "sample", "actor", null);
			Actor updatedActor = new Actor(1l, "updated sample", "actor", null);
			
			Mockito.when(repo.findById(1l)).thenReturn(Optional.of(actor));
			Mockito.when(repo.saveAndFlush(updatedActor)).thenReturn(updatedActor);
			
			Assertions.assertEquals(updatedActor, service.update(1l, updatedActor));
			
			Mockito.verify(repo, times(1)).findById(1l);
			Mockito.verify(repo, times(1)).saveAndFlush(updatedActor);
		}
		
		@Test
		void deleteTest() {
			
			Mockito.when(repo.existsById(1l)).thenReturn(true, false);
			
			Assertions.assertEquals(true, service.delete(1l));
			
			Mockito.verify(repo, times(1)).deleteById(1l);
			Mockito.verify(repo, times(2)).existsById(1l);
		}
		
		@Test
		void readAllTest() {
			List<Actor> actors = new ArrayList<Actor>();
			Actor actor = new Actor(1l, "sample", "actor", null);
			actors.add(actor);
			
			Mockito.when(repo.findAll()).thenReturn(actors);

			Assertions.assertEquals(actors, service.readAll());
			
			Mockito.verify(repo, times(1)).findAll();
		}
		
		@Test
		void readAllByNameTest() {
			List<Actor> actors = new ArrayList<Actor>();
			Actor actor = new Actor(1l, "sample", "actor", null);
			actors.add(actor);
			Mockito.when(repo.findAllByName("sample")).thenReturn(actors);

			Assertions.assertEquals(actors, service.readByName("sample"));
			
			Mockito.verify(repo, times(1)).findAllByName("sample");
		}
}
