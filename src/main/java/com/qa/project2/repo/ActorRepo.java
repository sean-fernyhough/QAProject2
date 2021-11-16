package com.qa.project2.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.qa.project2.domain.Actor;

@Repository
public interface ActorRepo extends JpaRepository <Actor, Long>{

	@Query("Select a from Actor a where CONCAT(a.first_name, ' ', a.last_name) like '%?1%'")
	public Optional<List<Actor>> findAllByName(String name);
	
}
