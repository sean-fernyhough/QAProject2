DROP TABLE IF EXISTS `MOVIE_CAST`;

CREATE TABLE `MOVIE_CAST`
(
`id` BIGINT auto_increment,
`movies_id` BIGINT NOT NULL,
`cast_id` BIGINT NOT NULL,
PRIMARY KEY(id)
);

DROP TABLE IF EXISTS `MOVIE`;

CREATE TABLE `MOVIE`
(
`id` BIGINT auto_increment,
`title` varchar(255) NOT NULL,
`synopsis` varchar(255),
`year` INT,
`rating` DECIMAL(2,1),
`runtime` INT,
PRIMARY KEY(id)
);

DROP TABLE IF EXISTS `ACTOR`;

CREATE TABLE `ACTOR`
(
`id` BIGINT auto_increment,
`first_name` varchar(255) NOT NULL,
`last_name` varchar(255) NOT NULL,
PRIMARY KEY(id)
);

