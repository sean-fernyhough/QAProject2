package com.qa.project2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class MovieServiceUnitTest {

@MockBean
private MovieRepo repo;

@Autowired
MovieService service;

@Test


}
