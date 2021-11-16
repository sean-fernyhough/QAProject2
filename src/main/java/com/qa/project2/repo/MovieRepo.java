package com.qa.project2.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.qa.project2.domain.Movie;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long> {

	@Query("Select m from movie m where m.title like '%?1%'")
	public Optional<List<Movie>> findAllByTitle(String title);
	
	@Query("Select m from movie m join movie_cast mc on m.id = mc.movie_id join actor a on a.id = mc.actors_id where CONCAT(a.first_name, ' ', a.last_name) like '%?1%'")
	public Optional<List<Movie>> findAllByName(String name);
	
	@Query("Select m from movie m where m.year = '%?1%'")
	public Optional<List<Movie>> findAllByYear(int year);
	
}
