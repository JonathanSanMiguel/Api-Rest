import express from "express";
import { pool } from "../database.js";

const router = express.Router();

// Obtener todos los regsitros
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM registro`);
    res.json(rows);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

// Obtener un registro
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM registro WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
});

// Borrar un resgitro
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "DELETE FROM registro WHERE id = ?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ status: "Registro borrado" });
      } else {
        console.log(err);
      }
    }
  );
});

// Insertar un registro
router.post("/", (req, res) => {
  const { id, entrada, salida, fecha } = req.body;
  console.log(id, entrada, salida, fecha);
  const query = `

    CALL registroAddOrEdit(?, ?, ?, ?);
  `;
  pool.query(query, [id, entrada, salida, fecha], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: "Regsitro guardado" });
    } else {
      console.log(err);
    }
  });
});

//Actualizar un registro
router.put("/:id", (req, res) => {
  const { entrada, salida, fecha } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @entrada = ?;
    SET @salida = ?;
    SET @fecha = ?;
    CALL registroAddOrEdit(@id, @entrada, @salida, @fecha);
  `;
  pool.query(query, [id, entrada, salida, fecha], (err, rows, fields) => {
    if (!err) {
      res.json({ status: "Registro actualizado" });
    } else {
      console.log(err);
    }
  });
});

export default router;