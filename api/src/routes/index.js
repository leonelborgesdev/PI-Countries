const { Router } = require("express");
const {
  getAllCountries,
  getCountryCode,
  getActivities,
  addActivitis,
  deleteActivity,
} = require("../controllers/CountryControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.get("/countries", getAllCountries);
router.get("/activity", getActivities);
router.get("/countries/:idPais", getCountryCode);
router.post("/activity", addActivitis);
router.delete("/activity/:id", deleteActivity);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router;
module.exports = router;
