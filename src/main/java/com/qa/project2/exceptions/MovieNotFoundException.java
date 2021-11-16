package com.qa.project2.exceptions;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Movie does not exist with that ID")
public class MovieNotFoundException extends EntityNotFoundException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7595908834830622438L;
	
}
