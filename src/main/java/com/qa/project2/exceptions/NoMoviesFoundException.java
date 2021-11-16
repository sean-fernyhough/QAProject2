package com.qa.project2.exceptions;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "No movies were a match for that criteria")
public class NoMoviesFoundException extends EntityNotFoundException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6351691472981424418L;

	
}
