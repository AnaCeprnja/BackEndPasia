// Imports
require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const log = require("../middleware/log"); // Console log formatter

// Database
const db = require('../models');

// Controllers
const test = (req, res) => {
    res.json({ message: "Endpoint Valid: Users" });
}

// GET ROUTE: /users/transaction-accounts
// Find all transactionAccount documents by Current User
const getTransactionAccounts = async (req, res) => {
  const where = "GET /users/transaction-accounts";
  try {
    // Get Transaction Accounts and populate related Currency information
    const transactionAccount = await db.TransactionAccount.find({
        belongs_to: req.user._id
    }).populate("currency");
    // Log success message and route location
    const successMessage = {
      name: `Found ${transactionAccount.length}`,
      message: "Transaction Accounts returned to requester as JSON",
      where
    }
    log.success(successMessage);
    
    // Return result as JSON Object
    res.json(transactionAccount);
    
  } catch (error) {
    // Log error message(s) and route location
    const errorList = log.mongooseErrors(error, where);
    
    // Return error message(s) as JSON Object
    res.status(400).json(errorList);
  }
}


const register = (req, res) => {
    // POST - adding the new user to the database
    console.log('===> Inside of /register');
    console.log('===> /register -> req.body');
    console.log(req.body);

    db.User.findOne({ email: req.body.email })
    .then(user => {
        // if email already exists, a user will come back
        if (user) {
            // send a 400 response
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            // Create a new user
            const newUser = new db.User({
                name: req.body.name,
                display_name: req.body.displayName,
                email: req.body.email,
                password: req.body.password
            });

            // Salt and hash the password - before saving the user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw Error;

                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) console.log('==> Error inside of hash', err);
                    // Change the password in newUser to the hash
                    newUser.password = hash;
                    newUser.save()
                    .then(createdUser => res.json(createdUser))
                    .catch(err => console.log(err));
                });
            });
        }
    })
    .catch(err => console.log('Error finding user', err))
}

const login = async (req, res) => {
    // POST - finding a user and returning the user
    console.log('===> Inside of /login');
    console.log('===> /login -> req.body');
    console.log(req.body);
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (foundUser) {
        // user is in the DB
        let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        console.log(isMatch);
        if (isMatch) {
            // if user match, then we want to send a JSON Web Token
            // Create a token payload
            // add an expiredToken = Date.now()
            // save the user
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name,
                displayName:
                foundUser.display_name
            }

            jwt.sign(payload, JWT_SECRET, { expiresIn: 14400 }, (err, token) => {
                if (err) {
                    res.status(400).json({ message: 'Session has endedd, please log in again'});
                }
                const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 240 });
                console.log('===> legit');
                console.log(legit);
                res.json({ success: true, token: `Bearer ${token}`, userData: legit });
            });

        } else {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }
    } else {
        return res.status(400).json({ message: 'User not found' });
    }
}

// private
const profile = (req, res) => {
    console.log('====> inside /profile');
    console.log(req.body);
    console.log('====> user')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ id, name, email });
}

const messages = async (req, res) => {
    console.log('====> inside /messages');
    console.log(req.body);
    console.log('====> user')
    console.log(req.user);
    const { id, name, email } = req.user; // object with user object inside
    const messageArray = ['message 1', 'message 2', 'message 3', 'message 4', 'message 5', 'message 6', 'message 7', 'message 8', 'message 9'];
    const sameUser = await db.User.findOne({ _id: id });
    res.json({ id, name, email, message: messageArray, sameUser });
}

// Exports
module.exports = {
    test,
    register,
    login,
    profile,
    messages,
    getTransactionAccounts
}