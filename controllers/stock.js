const db = require('../models');
const log = require("../middleware/log");

// Controllers
const show = (req, res) => {
    // Purpose: Fetch one example from DB and return
    console.log('=====> Inside GET /stocks/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id

    db.Stock.findById(req.params.id, (err, foundStock) => {
        if (err) console.log('Error in stock#show:', err);
        res.json(foundStock);
    });
};

const create = (req, res) => {
    // Purpose: Create one example by adding body to DB, and return
    console.log('=====> Inside POST /stocks');
    console.log('=====> req.body');
    console.log(req.body); // object used for creating new example

    db.Stock.create(req.body, (err, savedStock) => {
        if (err) console.log('Error in example#create:', err);
        res.json(savedStock);
    });
};

const update = (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside PUT /stocks/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id
    console.log('=====> req.body');
    console.log(req.body); // object used for updating example

    db.Stock.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedStock) => {
        if (err) console.log('Error in stock#update:', err);
        res.json(updatedStock);
    });
};

const destroy = (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside DELETE /stocks/:id');
    console.log('=====> req.params');
    console.log(req.params);

    db.Stock.findByIdAndDelete(req.params.id, (err, deletedStock) => {
        if (err) console.log('Error in stock#destroy:', err);
        res.sendStatus(200);
        console.log(deletedStock);
    });
};

const test = (req, res) => {
    res.json({ message: "Endpoint Valid: Stocks" });
}

const deleteAll = async (req, res) => {
  try {
    const emptyCollection = await db.Stock.deleteMany({});
    res.json(emptyCollection);
  } catch (error) {
    console.log(error)
  }
}

const getAll = async (req, res) => {
  const stocks = await db.Stock.find();
  
  console.log(stocks);
  res.json(stocks);
}

module.exports = {
    test,
    getAll,
    deleteAll,
    show,
    create,
    update,
    destroy,
}