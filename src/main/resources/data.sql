
INSERT INTO `MOVIE` (title, synopsis, year, rating, runtime) VALUES ('bad movie', 'this movie is bad', 2003, 2.7, 93)
INSERT INTO `MOVIE` (title, synopsis, year, rating, runtime) VALUES ('worse sequel', 'this movie is even worse', 2005, 1.3, 124)

INSERT INTO `ACTOR` (first_name, last_name) VALUES ('steven', 'seagull')
INSERT INTO `ACTOR` (first_name, last_name) VALUES ('van', 'diesel')
INSERT INTO `ACTOR` (first_name, last_name) VALUES ('bruce', 'willyoueverstopmakingbadmovies')

INSERT INTO `MOVIE_CAST` (movies_id, cast_id) VALUES (1,1)
INSERT INTO `MOVIE_CAST` (movies_id, cast_id) VALUES (1,2)
INSERT INTO `MOVIE_CAST` (movies_id, cast_id) VALUES (2,1)
INSERT INTO `MOVIE_CAST` (movies_id, cast_id) VALUES (2,3)