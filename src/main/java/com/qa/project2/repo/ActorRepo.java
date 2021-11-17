package com.qa.project2.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.qa.project2.domain.Actor;

@Repository
public interface ActorRepo extends JpaRepository <Actor, Long>{

	@Query(value = "Select * from Actor as a where CONCAT(a.first_name, ' ', a.last_name) like %?1%", nativeQuery = true)
	public List<Actor> findAllByName(String name);
	
}
