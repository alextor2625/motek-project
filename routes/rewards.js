var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Menu = require('../models/Menu');
const Meal = require('../models/Meal');
const Reward = require('../models/Rewards')
const { route } = require('./admin-user');



router.get('/content', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    const { fullname, username, points } = req.session.user
    if('redeems' in req.session.user){
        User.findById(req.session.user._id)
        .populate('redeems')
        .then(user =>{
            req.session.redeemed = user.redeems
            Reward.find()
            .then(rewards => {
                    let {redeemed} = req.session
                    console.log(req.session.redeems,"<<<<<===== MY REDEEMS");
                    // console.log(rewards, "<<<===== All Rewards");
                    let firstname = fullname.split(' ')[0]
                    res.render('rewards/rewards.hbs', { isLoggedIn: true, username, firstname, fullname, points, rewards, redeemed });
                })
        })
    } else{ 
        Reward.find()
            .then(rewards => {
                console.log(rewards, "<<<===== All Rewards");
                let firstname = fullname.split(' ')[0]
    
                res.render('rewards/rewards.hbs', { isLoggedIn: true, username, firstname, fullname, points, rewards });
            })
    }



});

router.get('/seeRewards', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    const { username, fullname } = req.session.user
    console.log('fullName:', fullname)
    console.log('Username:', username)
    res.render('rewards/see-rewards.hbs', { isLoggedIn: true, username, fullname, })
})


// ---- Add & Remove - Meal From
// Get 
router.get('/addyourpoints', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    let { chosenMeal } = req.session
    console.log('menuType', chosenMeal);
    if (req.query.showForm === 'false') {
        Menu.find({ menuType: chosenMeal })
            .then(picked => {
                picked = picked.map((item) => {
                    return { ...item._doc, chosen: chosenMeal }
                })
                Meal.find()
                    .then(meal => {
                        if (!meal[0].menuItems.length) {
                            res.render('rewards/add-points.hbs', { isLoggedIn: true, showForm: false, addedItems: false, picked, chosenMeal })
                        } else {
                            res.render('rewards/add-points.hbs', { isLoggedIn: true, showForm: false, addedItems: true, picked, chosenMeal })
                        }
                    })
            })
            .catch((err) => {
                console.error('Error retrieving menu items:', err);
                next(err);
            })
    } else {
        res.render('rewards/add-points.hbs', { isLoggedIn: true, showForm: true })
    }
})
// Post
router.post('/addyourpoints', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    req.session.chosenMeal = req.body.meal
    const chosenMeal = req.body.meal
    // console.log('line 35 - Chosen Meal Value:', chosenMeal);

    Menu.find({ menuType: chosenMeal })
        .then(picked => {
            // console.log('line 39 - Chosen Meal:', picked)
            picked = picked.map((item) => {
                return { ...item._doc, chosen: chosenMeal }
            })
            res.render('rewards/add-points.hbs', { isLoggedIn: true, showForm: false, showCart: false, picked, chosenMeal })
        })
        .catch((err) => {
            console.error('Error retrieving menu items:', err);
            next(err);
        })
})
// Select & Add an element to cart ------------------------
router.post('/addyourpoints/:menuType/:itemId', (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    console.log('Adding Item:', req.session, req.params)

    const fetchAndRenderMenu = (chosenMealType, sessionMeal) => {
        Menu.find({ menuType: chosenMealType })
            .then(picked => {
                picked = picked.map((item) => {
                    return { ...item._doc, chosen: chosenMealType }
                });
                const addedItems = sessionMeal && sessionMeal.menuItems && sessionMeal.menuItems.length > 0;
                res.render('rewards/add-points.hbs', { isLoggedIn, showForm: false, picked, chosenMeal: chosenMealType, addedItems });
            })
            .catch(err => {
                console.error('Error retrieving menu items:', err);
                next(err);
            });
    };

    if (req.session.meal) {
        Meal.findByIdAndUpdate(
            req.session.meal._id,
            { $push: { menuItems: req.params.itemId } },
            { new: true }
        )
            .then(updatedMeal => {
                console.log("New item ===>", updatedMeal);
                req.session.meal = updatedMeal;
                fetchAndRenderMenu(req.params.menuType, updatedMeal);
            })
            .catch(err => {
                console.error('Error updating meal:', err);
                next(err);
            });
    } else {
        Meal.create({ menuItems: req.params.itemId })
            .then(newMeal => {
                console.log("New meal ===>", newMeal);
                req.session.meal = newMeal;
                fetchAndRenderMenu(req.params.menuType, newMeal);
            })
            .catch(err => {
                console.error('Error creating meal:', err);
                next(err);
            });
    }
});


router.get('/myCart', (req, res, next) => {
    console.log('My cart')
    const itemId = req.session.meal._id
    console.log('ItemId', itemId)


    Meal.findById(itemId)
        .populate('menuItems')
        .then(addedItems => {

            if (!addedItems) {
                res.redirect('/rewards/addyourpoints')
            } else {
                console.log('added items:', addedItems)
                res.render('rewards/submit-rewards.hbs', { isLoggedIn: true, showForm: false, addedItems: addedItems.menuItems });
            }
        })

})

router.post('/myCart/delete/:item', async (req, res, next) => {

    const mealId = req.session.meal._id
    console.log('Line 155 - Deleted Item:', req.params.item);

    try {

        let foundMeal = await Meal.findById(mealId)

        let populatedMeal = await foundMeal.populate('menuItems')
        console.log('Line 162 - Populated Meal:', populatedMeal)
        if (populatedMeal.menuItems.length) {
            populatedMeal.menuItems = populatedMeal.menuItems.filter((el) => el._id.toString() !== req.params.item)
            let updated = populatedMeal.save()
            console.log("Updated", updated)
            res.redirect('/rewards/myCart')
        } else {
            res.redirect('/rewards/addyourpoints');
        }

    } catch (err) {
        console.log(err)
    }

})


// Filter -------------------------------------------------

router.get('/addyourpoints/filter', (req, res, next) => {
    console.log("body 😊", req.query)
    const { categoryFilter } = req.query
    let { itemNameFilter } = req.query
    itemNameFilter = itemNameFilter.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')

    if (itemNameFilter.length < 1 && categoryFilter === "All Categories") {
        Menu.find({ menuType: req.query.chosenMeal })
            .then(picked => {
                picked = picked.map((item) => {
                    return { ...item._doc, chosen: req.query.chosenMeal }
                })
                console.log("FILTER =====>", { picked });
                selected = "All Categories"
                res.render('rewards/add-points', { picked, itemNameFilter, selected: { selected: categoryFilter, chosenMeal: req.query.chosenMeal }, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length < 1 && categoryFilter !== "All Categories") {
        Menu.find({ category: categoryFilter, menuType: req.query.chosenMeal })
            .then(picked => {
                picked = picked.map((item) => {
                    return { ...item._doc, chosen: req.query.chosenMeal }
                })
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { picked });
                res.render('rewards/add-points', { picked, itemNameFilter, selected: { selected: categoryFilter, chosenMeal: req.query.chosenMeal }, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length && categoryFilter === "All Categories") {
        Menu.find({ itemName: { "$regex": `${itemNameFilter}`, "$options": "i" }, menuType: req.query.chosenMeal })
            .then(picked => {
                picked = picked.map((item) => {
                    return { ...item._doc, chosen: req.query.chosenMeal }
                })
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { picked });
                res.render('rewards/add-points', { picked, itemNameFilter, selected: { selected: categoryFilter, chosenMeal: req.query.chosenMeal }, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length && categoryFilter !== "All Categories") {
        Menu.find({ itemName: { "$regex": `${itemNameFilter}`, "$options": "i" }, category: categoryFilter, menuType: req.query.chosenMeal })
            .then(picked => {
                picked = picked.map((item) => {
                    return { ...item._doc, chosen: req.query.chosenMeal }
                })
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { picked });
                res.render('rewards/add-points', { picked, itemNameFilter, selected: { selected: categoryFilter, chosenMeal: req.query.chosenMeal }, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
})


router.get('/submitpoints', (req, res, next) => {
    req.session.currentCalories = 0;
    req.session.currentPoints = 0;
    Meal.findById(req.session.meal._id)
        .populate('menuItems')
        .then(foundMeal => {
            console.log("SUBMIT POINTS ====>", foundMeal.menuItems);
            let totalCalories = 0;
            foundMeal.menuItems.forEach((menuItem => {
                totalCalories += menuItem.calories
            }))
            let totalPoints = Math.ceil(totalCalories / 100);
            req.session.currentCalories = totalCalories;
            req.session.currentPoints = totalPoints;
            res.render('rewards/submit-points', { addedItems: foundMeal.menuItems, calories: totalCalories, totalPoints, itemCount: foundMeal.menuItems.length })

        })
        .catch(err => console.log(err))

})

router.get('/confirm', (req, res, next) => {
    User.findByIdAndUpdate(req.session.user._id, { $inc: { points: req.session.currentPoints } }, { new: true })
        .then(updated => {
            console.log(updated, " <<<===== User confirmed and updated");
            req.session.user = updated;
            res.redirect('/rewards/content')
        })
})


router.post('/redeem/:rewardId', (req, res, next) => {
    // const {username, fullname, rewards}

    if ('redeems' in req.session.user) {
        User.findByIdAndUpdate(req.session.user._id,
            { $push: { redeems: req.params.rewardId } },
            { new: true })
            .then(updatedUser => {
                console.log(updatedUser, "<<<<==== User Has added redeemed a reward");
                req.session.user = updatedUser;
                res.redirect('/rewards/content');
            })
    } else{
        User.findByIdAndUpdate(req.session.user._id,
            { redeems: req.params.rewardId },
            { new: true })
            .then(updatedUser => {
                console.log(updatedUser, "<<<<==== User Has added redeemed a reward");
                req.session.user = updatedUser;
                res.redirect('/rewards/content');
            })
    }


    // if ('redeem' in req.session) {
    //     User.findByIdAndUpdate(
    //         req.session.user._id,
    //         { $push: { redeems: req.params.rewardId } },
    //         { new: true }
    //     )
    //         .then(updatedUser => {
    //             console.log("New item ===>", updatedUser);
    //             req.session.user = updatedUser;
    //             return updatedUser;
    //         })
    //         .populate('redeems')
    //         .then()
    //         .catch(err => {
    //             console.error('Error updating meal:', err);
    //             next(err);
    //         });
    // } else {
    //     Meal.create({ menuItems: req.params.itemId })
    //         .then(newMeal => {
    //             console.log("New meal ===>", newMeal);
    //             req.session.meal = newMeal;
    //             fetchAndRenderMenu(req.params.menuType, newMeal);
    //         })
    //         .catch(err => {
    //             console.error('Error creating meal:', err);
    //             next(err);
    //         });
// }
})

module.exports = router;