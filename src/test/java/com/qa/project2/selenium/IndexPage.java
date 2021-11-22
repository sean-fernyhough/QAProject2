package com.qa.project2.selenium;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class IndexPage {
	public String URL = "http://localhost:8080";
	
	@FindBy(xpath = "//*[@id=\"search-drop-1\"]")
	private WebElement drop1;
	
	@FindBy(xpath = "/html/body/div/nav/div/div/form/div[1]/select/option[2]")
	private WebElement option;
	
	@FindBy(id = "searchDrop-2")
	private WebElement drop2;
	
	@FindBy(id = "search-input")
	private WebElement searchbar;
	
	@FindBy(id = "search-submit")
	private WebElement searchBtn;
	
	@FindBy(id = "navbarDropdown")
	private WebElement dropdown;
	
	@FindBy(id = "movieCreate")
	private WebElement movieCreate;
	
	@FindBy(id = "actorCreate")
	private WebElement actorCreate;
	
	
	
	@FindBy(xpath = "/html/body/div/div/div/div/div/div/h5")
	private WebElement title; 
	
	@FindBy(id = "movieMenu")
	private WebElement movieMenu;
	
	
	@FindBy(id = "actorMenu")
	private WebElement actorMenu;
	
	@FindBy(xpath = "/html/body/div/nav/div/div/ul/li[1]/a")
	private WebElement allMovies;
	
	@FindBy(xpath = "/html/body/div/nav/div/div/ul/li[2]/a")
	private WebElement allActors;
	
	public void setSearchActor() {
		drop1.click();
		option.click();
		
	}
	
	public String resultCheck() {
		return title.getText();
	}
	
	public void search(String searchTerm) {
		searchbar.sendKeys(searchTerm);
		searchbar.sendKeys(Keys.RETURN);
	}
	
	public String titleCheck(WebDriver driver) {
		return driver.getTitle();
	}
	
	public boolean openMovieCreate() throws InterruptedException {
		dropdown.click();
		Thread.sleep(500);
		movieCreate.click();
		Thread.sleep(500);
		return movieMenu.isDisplayed();
	}
	
	public boolean openActorCreate() throws InterruptedException {
		dropdown.click();
		Thread.sleep(500);
		actorCreate.click();
		Thread.sleep(500);
		return actorMenu.isDisplayed();
		
	}
	
	public void openAllActors() {
		allActors.click();
	}
	
	public void openAllMovies() {
		allMovies.click();	
	}
	

}
