package com.qa.project2;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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
public class ActorIntegrationTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private ObjectMapper mapper;

	@Test
	public void createTest() throws Exception {
		Actor actor1 = new Actor(1l, "steven", "seagull", null);
		Actor actor2 = new Actor(2l, "van", "diesel", null);
		Actor actor3 = new Actor(3l, "bruce", "willyoueverstopmakingbadmovies", null);
		List<Actor> actors = new ArrayList<Actor>();
		actors.add(actor1);
		actors.add(actor2);
		actors.add(actor3);
		
		Actor actor = new Actor("amanda", "ripley", null);
		
		String actorJson = mapper.writeValueAsString(actor);
		
		RequestBuilder request = post("/actors/create").contentType(MediaType.APPLICATION_JSON).content(actorJson);
		
		ResultMatcher checkStatus = status().is(201);

		Actor createdActor = new Actor(4l, "amanda", "ripley", null);
		String createdActorJson = mapper.writeValueAsString(createdActor);
		
		ResultMatcher checkBody = content().json(createdActorJson);
		
		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void readAllTest() throws Exception {
		Actor actor1 = new Actor(1l, "steven", "seagull", null);
		Actor actor2 = new Actor(2l, "van", "diesel", null);
		Actor actor3 = new Actor(3l, "bruce", "willyoueverstopmakingbadmovies", null);
		List<Actor> actors = new ArrayList<Actor>();
		actors.add(actor1);
		actors.add(actor2);
		actors.add(actor3);
		
		String actorJson = mapper.writeValueAsString(actors);
		
		RequestBuilder request = get("/actors/get").contentType(MediaType.APPLICATION_JSON);
		
		ResultMatcher checkStatus = status().is(200);
		
		ResultMatcher checkBody = content().json(actorJson);
		
		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void readAllByNameTest() throws Exception {
		Actor actor2 = new Actor(2l, "van", "diesel", null);
		List<Actor> actors = new ArrayList<Actor>();
		actors.add(actor2);

		String actorJson = mapper.writeValueAsString(actors);
		String search = "van";
		
		RequestBuilder request = get("/actors/get/" + search).contentType(MediaType.APPLICATION_JSON);
		
		ResultMatcher checkStatus = status().is(200);
		
		ResultMatcher checkBody = content().json(actorJson);
		
		this.mvc.perform(request).andExpect(checkStatus).andExpect(checkBody);
	}

	
}
