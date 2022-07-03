USE api_dw;
DELIMITER $$
USE `api_dw`$$


CREATE PROCEDURE `registroAddOrEdit` (
  IN _id INT,
  IN _entrada INT(20),
  IN _salida INT(20),
  IN _fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO registro (entrada, salida, fecha) VALUES (_entrada, _salida, _fecha);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE registro
    SET
    entrada = _entrada,
    salida = _salida,
    fecha = _fecha
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END