package com.qa.project2.domain;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;


@Entity
public class Movie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = true)
	private int year;
	
	@Column(nullable = true)
	private int runtime;
	
	@ManyToMany(targetEntity = Actor.class)
	private List<Actor> cast;
	
	private String synopsis;
	
	@Column(nullable = true)
	private double rating;

	public Movie() {
	}

	public Movie(String title, int year, int runtime, List<Actor> cast, String synopsis, double rating) {
		this.title = title;
		this.year = year;
		this.runtime = runtime;
		this.cast = cast;
		this.synopsis = synopsis;
		this.rating = rating;
	}

	public Movie(long id, String title, int year, int runtime, List<Actor> cast, String synopsis, double rating) {
		this.id = id;
		this.title = title;
		this.year = year;
		this.runtime = runtime;
		this.cast = cast;
		this.synopsis = synopsis;
		this.rating = rating;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getRuntime() {
		return runtime;
	}

	public void setRuntime(int runtime) {
		this.runtime = runtime;
	}

	public List<Actor> getCast() {
		return cast;
	}

	public void setCast(List<Actor> cast) {
		this.cast = cast;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", title=" + title + ", year=" + year + ", runtime=" + runtime + ", synopsis="
				+ synopsis + ", rating=" + rating + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(rating, runtime, synopsis, title, year);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Movie other = (Movie) obj;
		return Double.doubleToLongBits(rating) == Double.doubleToLongBits(other.rating) && runtime == other.runtime
				&& Objects.equals(synopsis, other.synopsis) && Objects.equals(title, other.title) && year == other.year;
	}
	
	
	
	
}
