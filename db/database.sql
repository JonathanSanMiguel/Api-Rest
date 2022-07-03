CREATE DATABASE IF NOT EXISTS api_dw;

USE api_dw;

create table registro(
id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
entrada int(20) NOT NULL,
salida int(20) NOT NULL,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
ON UPDATE CURRENT_TIMESTAMP );

DESCRIBE registro;

INSERT INTO registro values 
  (1, 25, 20),
  (2, 100, 100),
  (3, 59, 58);

SELECT * FROM registro;