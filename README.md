Coverage: 81.5%
Project 2 (My Movies)

This project included the development and testing of a web app that functions as a movie database, it allows a user to create, read, update, and delete elements and supports uploading images for personalisation. This project utilises spring as it's backend and so is written in java. The database uses MySQL to handle relational database functionality. This project includes all the necessary development resources as well as a built and executable .jar file. The jarfile connects to MySQL using the root user with password of root. This can be changed in the applicatiion-prod.properties file and rebuilt. In order for the jar file to be built, the project will need to be running as a spring boot app in order for the selenium tests to pass.

## Getting Started

This project was built in Eclipse, and so will be easiest to open in eclipse as an existing project. This will require eclipse to be installed on your machine, as well as any version of the java development kit.

### Prerequisites

This will require any version of the java development kit (jdk), along with eclipse java IDE. This project also has several dependencies, including maven, junit, log4j, equalsVerifier, mockito, h2 database, selenium, and most importantly Spring boot. Finally, this project will also require a local MySQL insallation.



### Installing

Java

The first step will be installing the java development kit (jdk), this can be downloaded from https://www.oracle.com/java/technologies/downloads/ 
Select the executable version that best matches your system. Once downloaded, run the installer and follow the instructions included, once installed ensure that your system environment path variable contains the path to the directory you installed the jdk to. Once installed, run java --version in your preferred command line interface (CLI) to check that it is working.

MySQL

The next step is download and installing MySQL. This can be downloaded from https://dev.mysql.com/downloads/workbench/
This will install MySQL and MySQL workbench, a GUI program to work with MySQL, once downloaded run the installer and follow the intructions. It is suggested to install everything to enusre compatability. At a certain point you will be asked to create a password for the root user, make a note of the password you choose as it cannot be recovered without installing MySQL again. You should also check it has been added to your system environment path variable, if not add it in the same way you added java. once this has been downloaded, run mysql -u root in your CLI, then enter the root password.

Eclipse

Once java and MySQL has been installed, it is time to download and install eclipse, this can be downloaded from https://www.eclipse.org/downloads/
Run the installer for your system and follow the intructions provided.

Maven
Maven is an integrated build tool for eclipse that can build .jar files with any required dependencies. 
Maven should be installed within your eclipse. To check, open eclipse, then go to file, create new project, then select a maven project. If this option is not there, you can add maven to eclipse using help, install new software, then in the pop up, click add, in name enter M2Eclipse and in address enter http://download.eclipse.org/technology/m2e/releases and click add. This should install maven to your eclipse. The dependencies will be automatically installed when the progra is run, all the information for them is in the pom.xml file.

SpringBoot
Spring is installed in a similar way to maven, use help > install new software > add > and in name enter http://springide.org/updatesite. This may take a while to install.

You are now ready to import this project. Fork this project to your own repository, then clone it down to you local system. Now in eclipe, go to file and click on open projects from file system and navigate to your cloned project folder. Click fininshed and it will be added to your eclipse projects.

You can run the program from eclipse by right clicking on the project and clicking run as spring boot application. This will run the program in the console in eclipse. To access the web app, connect to http:/localhost:8080 in a browser of your choice.  By default the program will attempt to connect to your database using the root account using a password of root. You can change these details in /src/main/resources/application-prod.properties to allow it to connect.

To run this program as a single jar file, choose run as maven build in eclipse, once the file has been built it can be run with java -jar name of the jar file. A copy of this jar file has been included in the project root directory.

## Running the tests

The automated tests for this project can be run in several ways, either individually from the test files within /src/test/java/ or all together by right clicking on the project, and clicking run as junit test. These test will test all areas of the program and report any errors they find, they should all complete successfully. Please ensure the project is already running as a Spring Boot application before running the tests, otherwise the selenium tests will fail as they will be unable to connect to the site.

### Unit Tests 

Unit tests are for testing the smallest amount if information in the program, typically individual methods. In the program they can be run as all automated testing is run, through run as junit test. Unit testing in this program primarily used to test the database access objects to check that they return the data they should from a test database. They are also used when testing the domain classes to make sure they are constructed properly. Mockito is used for the controller and service classes. All of these tests are run with run as junit test.

### Integration Tests 
Integration testing is a level up from unit testing, and involves testing that differenct methods and classes work together as a group.
Integration tests for this project tests that a request sent to a controller uses a service to tell a repository to acces the database and return the correct values using SQL queries, these automated tests are run with run as junit test on the project. 

### And coding style tests

Coding style tests simply refer to checking that the code conforms to standard coding style practices, in java an example is that variable should be in camel case such as testVariable where as classes should be in pascal case such as TestClass. Ensuring that code conforms to these standard makes it easier to read and maintain, and allows you to distinguish different data types like Classes and variables easily. This test involves reading through code and changing it where necessary to make it conform to standard coding styles.

## Deployment

To deploy this program simply run the compiled .jar file and connect to http:/localhost:8080.

## Built With

* [Maven](https://maven.apache.org/) - Dependency Management

## Versioning

I use git and [github](https://github.com) for versioning.

## Authors

* Sean Fernyhough - *order and item functionality, testing, built standalone executable* - [sean-fernyhough](https://github.com/sean-fernyhough)

## License

This project is licensed under the MIT license - see the [LICENSE.md](LICENSE.md) file for details 

*For help in [Choosing a license](https://choosealicense.com/)*

## Acknowledgments
