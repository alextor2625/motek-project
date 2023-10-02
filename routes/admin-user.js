var express = require('express');
var router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const User = require('../models/User')
const Menu = require('../models/Menu')


/* GET home page. */
router.get('/user', isLoggedIn, function (req, res, next) {
    console.log("Admin User recognised");
    const isLoggedIn = req.session.user ? true : false;
    res.render('users/admin-profile', { isLoggedIn, admin: true });
});


router.get('/user/lunchmenu/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;

    Menu.find()
        .then(menuItems => {
            const itemCount = menuItems.length
            res.render('menus/edit-lunch-menu', { isLoggedIn, admin: true, menuItems, itemCount })
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            res.render('error', { errorMessage: 'Failed to fetch menu items' });
        });
})

router.post('/user/lunchmenu/edit', isLoggedIn, (req, res, next) => {
    const { menuType, category, calories, itemName, description } = req.body
    console.log('Received Post Data:', req.body)

    if (!menuType || !category || !calories || !itemName || !description) {
        res.render('menus/edit-lunch-menu', { errorMessage: 'Missing categories' });
        return;
    }

    Menu.create({
        menuType: menuType,
        category: category,
        calories: calories,
        itemName: itemName,
        description: description
    })

        .then(newItem => {
            // Después de crear el nuevo elemento, busca todos los elementos de menú
            return Menu.find();
        })
        .then(menuItems => {
            // Renderiza la página 'edit-lunch-menu' con todos los elementos de menú
            res.render('menus/edit-lunch-menu', { menuItems, itemCount: menuItems.length });
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to create menu item' });
        });
})


router.get('/user/dinnermenu/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    Menu.find()
        .then(menuItems => {
            const itemCount = menuItems.length
            res.render('menus/edit-dinner-menu', { isLoggedIn, admin: true, menuItems, itemCount })
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            res.render('error', { errorMessage: 'Failed to fetch menu items' });
        });
})

router.post('/user/dinnermenu/edit', isLoggedIn, (req, res, next) => {
    const { menuType, category, calories, itemName, description } = req.body
    console.log('Received Post Data:', req.body)

    if (!menuType || !category || !calories || !itemName || !description) {
        res.render('menus/edit-dinner-menu', { errorMessage: 'Missing categories' });
        return;
    }

    Menu.create({
        menuType: menuType,
        category: category,
        calories: calories,
        itemName: itemName,
        description: description
    })

        .then(newItem => {
            // Después de crear el nuevo elemento, busca todos los elementos de menú
            return Menu.find();
        })
        .then(menuItems => {
            // Renderiza la página 'edit-dinner-menu' con todos los elementos de menú
            res.render('menus/edit-dinner-menu', { menuItems, itemCount: menuItems.length });
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to create menu item' });
        });
})
router.get('/user/rewards/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    res.render('rewards/edit-rewards', { isLoggedIn, admin: true })
})


module.exports = router;