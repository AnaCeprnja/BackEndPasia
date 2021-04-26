const router = require('express').Router();
const ctrl = require('../controllers/');

// routes
router.get("/test", ctrl.stock.test);
router.get("/", ctrl.stock.getAll);
router.delete("/delete/all", ctrl.stock.deleteAll);
router.get('/:id', ctrl.stock.show);
router.post('/', ctrl.stock.create);
router.put('/:id', ctrl.stock.update);
router.delete('/:id', ctrl.stock.destroy);

module.exports = router;