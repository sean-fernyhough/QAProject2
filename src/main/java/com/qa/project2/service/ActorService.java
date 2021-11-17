package com.qa.project2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.qa.project2.domain.Actor;
import com.qa.project2.exceptions.ActorNotFoundException;
import com.qa.project2.repo.ActorRepo;

@Service
public class ActorService {

	private ActorRepo repo;
	
	ActorService(ActorRepo repo) {
		this.repo = repo;
	}
	
	public Actor create(Actor actor) {
		return repo.saveAndFlush(actor);
	}
	
	public List<Actor> readAll(){
		return repo.findAll();
	}
	
	public List<Actor> readByName(String name){
		return repo.findAllByName(name);
	}
	
	public Actor update(long id, Actor actor) {
		Actor existing = repo.findById(id).orElseThrow(ActorNotFoundException::new);
		existing.setFirstName(actor.getFirstName());
		existing.setLastName(actor.getLastName());
		return repo.saveAndFlush(existing);
	}
	
	public boolean delete(long id) {
		if (!repo.existsById(id)){throw new ActorNotFoundException();};
		repo.deleteById(id);
		return !repo.existsById(id);
	}
	
}
