package com.qa.project2.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.qa.project2.domain.Movie;

@Repository
public interface MovieRepo extends JpaRepository<Movie, Long> {

	@Query(value = "Select * from movie as m where m.title like %?1%", nativeQuery = true)
	public List<Movie> findAllByTitle(String title);
	
	@Query(value = "Select * from movie as m join movie_cast as mc on m.id = mc.movies_id join actor as a on a.id = mc.cast_id where CONCAT(a.first_name, ' ', a.last_name) like %?1%", nativeQuery = true)
	public List<Movie> findAllByName(String name);
	
	@Query(value = "Select * from movie as m where m.year = ?1", nativeQuery = true)
	public List<Movie> findAllByYear(int year);
	
}
