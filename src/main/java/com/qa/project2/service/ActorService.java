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
	

	
}
