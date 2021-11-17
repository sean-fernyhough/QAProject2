package com.qa.project2;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.project2.domain.Actor;
import com.qa.project2.domain.Movie;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = { "classpath:schema.sql", "classpath:data.sql" }, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
public class MovieIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper mapper;

	@Test
	public void createTest() throws Exception {
		Actor actor1 = new Actor(1l, "steven", "seagull", null);
		Actor actor2 = new Actor(2l, "van", "diesel", null);
		List<Actor> cast = new ArrayList<Actor>();
		cast.add(actor1);
		cast.add(actor2);
		
		Movie movie = new Movie("a new movie", 2001, 125,  cast, "movie synopsis", 2.1);
		
		String movieJson = mapper.writeValueAsString(movie);
		
		RequestBuilder request = post("/movies/create").contentType(MediaType.APPLICATION_JSON).content(movieJson);
		
		ResultMatcher checkStatus = status().is(201);
		
		Movie createdMovie = new Movie(3l, "a new movie", 2001, 125,  cast, "movie synopsis", 2.1);
		String createdMovieJson = mapper.writeValueAsString(createdMovie);
		
		ResultMatcher checkBody = content().json(createdMovieJson);
		
		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);
		
		
	}

}