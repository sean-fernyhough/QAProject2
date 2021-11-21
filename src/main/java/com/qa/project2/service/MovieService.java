package com.qa.project2.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.qa.project2.domain.Movie;
import com.qa.project2.exceptions.MovieNotFoundException;
import com.qa.project2.exceptions.NoMoviesFoundException;
import com.qa.project2.repo.MovieRepo;

@Service
public class MovieService {

	private MovieRepo repo;

	MovieService(MovieRepo repo) {
		this.repo = repo;
	}

	public Movie create(Movie movie) {
		return repo.saveAndFlush(movie);
	}

	public List<Movie> readAll() {
		return repo.findAll();
	}

	public Movie update(long id, Movie movie) {
		Movie existing = repo.findById(id).orElseThrow(MovieNotFoundException::new);
		existing.setTitle(movie.getTitle());
		existing.setSynopsis(movie.getSynopsis());
		existing.setRating(movie.getRating());
		existing.setRuntime(movie.getRuntime());
		existing.setYear(movie.getYear());
		existing.setCast(movie.getCast());
		return repo.saveAndFlush(existing);
	}

	public boolean delete(long id) {
		if (!repo.existsById(id)) {
			throw new MovieNotFoundException();
		}
		;
		repo.deleteById(id);
		return !repo.existsById(id);
	}

	public Movie addImage(long id, MultipartFile image) throws IOException {
		String[] imageArray = image.getOriginalFilename().split("\\.");
		imageArray[0] = Long.toString(id);
		String filename = String.join(".", imageArray);
		System.out.println(filename);
		
		Path path = Paths.get("my_movies/images/movies/" + id + "/", filename);
		Path created;
		if(Files.exists(path)){

				created = Files.write(path, image.getBytes());
				System.out.println(created);

		}else {
			new File("my_movies/images/movies/"+id+"/").mkdirs();

				created = Files.write(path, image.getBytes());
				System.out.println(created.toString());

			
		
		}
		Movie existing = repo.findById(id).orElseThrow(MovieNotFoundException::new);
		existing.setImageUrl(created.toString());
		return repo.saveAndFlush(existing);
	}
	
	public List<Movie> readAllByYear(int year) {
		List<Movie> movies;
		if ((movies = repo.findAllByYear(year)).size() < 1) {throw new NoMoviesFoundException();};
		return movies;
	}

	public List<Movie> readAllByTitle(String title) {
		List<Movie> movies;
		if ((movies = repo.findAllByTitle(title)).size() < 1) {throw new NoMoviesFoundException();};
		return movies;
	}

	public List<Movie> readAllByCast(String name) {
		List<Movie> movies;
		if ((movies = repo.findAllByName(name)).size() < 1) {throw new NoMoviesFoundException();};
		return movies;
	}
	
	public Movie readById(long id) {
		return repo.findById(id).orElseThrow(MovieNotFoundException::new);
	}

}
