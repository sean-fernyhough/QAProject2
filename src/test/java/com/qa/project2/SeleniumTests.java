package com.qa.project2;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.PageFactory;

import com.qa.project2.selenium.IndexPage;

public class SeleniumTests {

	private WebDriver driver;
	
	@BeforeEach
	void setup() {
		System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
		driver = new ChromeDriver();
		driver.manage().window().setSize(new Dimension(1366, 768));
	}
	
	@AfterEach
	void teardown() {
		driver.close();
	}
	
	@Test
	public void searchbarMovie() throws Exception {
			String testString = "Wrath";
			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			indexPage.search(testString);
			
			
			
			Thread.sleep(500);
			Assertions.assertTrue(indexPage.titleCheck(driver).contains("My Movies - Search Results"));
			Thread.sleep(500);
			System.out.println(indexPage.resultCheck());
			Assertions.assertTrue(indexPage.resultCheck().contains(testString));
			
	}
	
	@Test
	public void searchbarActor() throws Exception{
			String testString = "Nemoy";
			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			
			
			Thread.sleep(1000);
			indexPage.setSearchActor();
			indexPage.search(testString);
			Thread.sleep(1000);
			Assertions.assertTrue(indexPage.titleCheck(driver).contains("My Movies - Search Results"));
			Thread.sleep(1000);
			System.out.println(indexPage.resultCheck());
			Assertions.assertTrue(indexPage.resultCheck().contains(testString));

	}
	
	@Test
	public void actorCreateTest() throws Exception{
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			Thread.sleep(500);
			Assertions.assertTrue(indexPage.openMovieCreate());
	}

	@Test
	public void movieCreateTest() throws Exception{			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			Thread.sleep(500);
			Assertions.assertTrue(indexPage.openActorCreate());
	}
	
	@Test
	public void allMoviesTest() throws Exception{			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			Thread.sleep(500);
			Assertions.assertTrue(indexPage.openActorCreate());
	}

	@Test
	public void allActorsTest() throws Exception{			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			Thread.sleep(500);
			Assertions.assertTrue(indexPage.openActorCreate());
	}
	
	@Test
	public void openAllActorsTest() throws Exception{			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			Thread.sleep(500);
			indexPage.openAllActors();
			Thread.sleep(500);
			Assertions.assertTrue(indexPage.titleCheck(driver).contains("My Movies - Actors"));
	}
	
	@Test
	public void openAllMoviesTest() throws Exception{			
			IndexPage indexPage = PageFactory.initElements(driver, IndexPage.class);
			
			driver.get(indexPage.URL);

			Thread.sleep(500);
			indexPage.openAllMovies();
			Thread.sleep(500);
			Assertions.assertTrue(indexPage.titleCheck(driver).contains("My Movies - Movies"));
	}	
	
}
