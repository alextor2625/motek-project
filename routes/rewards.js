var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Menu = require('../models/Menu');



router.get('/content', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    const { username } = req.session.user

    res.render('rewards/rewards.hbs', { isLoggedIn: true, username });
});

router.get('/seeRewards', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    const { username, fullname } = req.session.user
    console.log('fullName:', fullname)
    console.log('Username:', username)
    res.render('rewards/see-rewards.hbs', { isLoggedIn: true, username, fullname })
})


// ---- Add & Remove - Meal From
// Get 
router.get('/addyourpoints', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;

    res.render('rewards/add-points.hbs', { isLoggedIn: true, showForm: true })
})
// Post
router.post('/addyourpoints', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    const chosenMeal = req.body.meal
    console.log('line 35 - Chosen Meal Value:', chosenMeal);

    Menu.find({ menuType: chosenMeal })
        .then(picked => {
            console.log('line 39 - Chosen Meal:', picked)
            res.render('rewards/add-points.hbs', { isLoggedIn: true, showForm: false, picked, chosenMeal })
        })
        .catch((err) => {
            console.error('Error retrieving menu items:', err);
            next(err);
        })
})

// Filter -------------------------------------------------

router.get('/addyourpoints/filter', (req, res, next) => {
    const {categoryFilter } = req.query
    let { itemNameFilter, selected } = req.query
    itemNameFilter = itemNameFilter.replace(/^\s+|\s+$/g,'').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')

    if (itemNameFilter.length < 1 && categoryFilter === "All Categories") {
        Menu.find({ menuType: "Lunch" })
        .then(picked => {
            console.log("FILTER =====>", { picked });
            selected = "All Categories"
            res.render('rewards/add-points', { picked, itemNameFilter, selected, chosenMeal: "Lunch", isLoggedIn: true })
        })
        .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length < 1 && categoryFilter !== "All Categories") {
        Menu.find({ category: categoryFilter, menuType: "Lunch" })
            .then(picked => {
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { picked });
                res.render('rewards/add-points', { picked, itemNameFilter, selected, chosenMeal: "Lunch", isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length && categoryFilter === "All Categories") {
        Menu.find({ itemName: itemNameFilter, menuType: "Lunch" })
            .then(picked => {
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { picked });
                res.render('rewards/add-points', { picked, itemNameFilter,selected, chosenMeal: "Lunch", isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length && categoryFilter !== "All Categories") {
        Menu.find({ itemName: itemNameFilter, category: categoryFilter, menuType: "Lunch" })
            .then(picked => {
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { picked });
                res.render('rewards/add-points', { picked, itemNameFilter,selected, chosenMeal: "Lunch", isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
})
module.exports = router;