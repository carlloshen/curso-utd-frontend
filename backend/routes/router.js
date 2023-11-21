let express = require('express')
let router = express.Router();

const clientes = require("../controllers/controller.js")

router.post("/api/funcionario", clientes.createFuncionario)
router.get("/api/funcionario/:id", clientes.getFuncionario)
router.get("/api/funcionario", clientes.funcionarios)
router.put("/api/funcionario", clientes.updateFuncionario)
router.delete("/api/funcionario/:id", clientes.deleteFuncionario)

module.exports = router;