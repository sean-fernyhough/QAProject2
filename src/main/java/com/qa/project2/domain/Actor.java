package com.qa.project2.domain;

import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Actor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String firstName;
	
	private String lastName;
	
	@JsonIgnore
	@ManyToMany(targetEntity=Movie.class, mappedBy = "actors")
	private List<Movie> movies;

	public Actor() {
	}

	public Actor(String firstName, String lastName, List<com.qa.project2.domain.Movie> movies) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.movies = movies;
	}

	public Actor(long id, String firstName, String lastName, List<com.qa.project2.domain.Movie> movies) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.movies = movies;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<Movie> getMovies() {
		return movies;
	}

	public void setMovies(List<Movie> movies) {
		this.movies = movies;
	}

	@Override
	public String toString() {
		return "Actor [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", movies=" + movies + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, lastName, movies);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Actor other = (Actor) obj;
		return id == other.id && Objects.equals(lastName, other.lastName) && Objects.equals(movies, other.movies);
	}
	
	
	
	
}
