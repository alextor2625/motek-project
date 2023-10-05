var express = require('express');
var router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const User = require('../models/User')
const Menu = require('../models/Menu')
const Reward = require('../models/Rewards')


/* GET home page. */
router.get('/user', isLoggedIn, function (req, res, next) {
    if (req.session.user.admin) {
        console.log("Admin User recognised");

        const isLoggedIn = req.session.user ? true : false;
        return res.render('users/admin-profile', { isLoggedIn, admin: true });
    }
    else {
        return res.redirect('/')
    }
});

router.get('/user/lunchmenu/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;

    Menu.find({ menuType: 'Lunch' })
        .then(menuItems => {
            const itemCount = menuItems.length
            res.render('menus/edit-lunch-menu', { route: "/admin/user/lunchmenu/filter", resetRoute: "/admin/user/lunchmenu/edit", isLoggedIn, admin: true, menuItems, itemCount })
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            res.render('error', { errorMessage: 'Failed to fetch menu items' });
        });
})

// ----------------------------------------------------------------------------

// Post #1

router.post('/user/lunchmenu/edit', isLoggedIn, (req, res, next) => {
    const { menuType, category, calories, itemName, description } = req.body
    console.log('Received Post Data:', req.body)

    if (!menuType || !category || !calories || !itemName || !description) {
        res.redirect('/admin/user/lunchmenu/edit')
        return;
    }
    Menu.create({
        menuType: menuType,
        category: category,
        calories: calories,
        itemName: itemName.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        description: description.replace(/^\s+|\s+$/g, '').charAt(0).toUpperCase() + description.replace(/^\s+|\s+$/g, '').slice(1).toLowerCase()
    })

        .then(newItem => {
            console.log("Created New Menu Item =====> ", newItem);
            return Menu.find({ menuType: 'Lunch' });
        })
        .then(menuItems => {
            console.log("All Menu Items =====> ", menuItems);
            // res.render('menus/edit-lunch-menu', { menuItems, itemCount: menuItems.length, isLoggedIn: true });
            res.redirect('/admin/user/lunchmenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to create menu item' });
        });
})

//old
router.get('/user/lunchmenu/edit/:itemId', isLoggedIn, (req, res, next) => {
    const itemId = req.params.itemId
    console.log('get itemId:', itemId)
    Menu.findById(itemId)
        .then(menuItem => {
            menuItem.edit = true
            console.log('Menu Item:', menuItem)
            const { menuType, category, calories, itemName, description, edit, _id } = menuItem;
            res.render('menus/edit-lunch-menu', { menuType, category, calories, itemName, description, edit, _id, isLoggedIn: true })
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to create menu item' });
        });
})
// ------------------------------------------------
router.post('/user/lunchmenu/edit/:itemId', isLoggedIn, (req, res, next) => {
    const { itemId } = req.params
    const { menuType, category, calories, itemName, description } = req.body;
    if (!itemName || !description) {

        Menu.findById(itemId)
            .then(menuItem => {
                menuItem.edit = true
                return res.render('menus/edit-lunch-menu', { ...menuItem._doc, isLoggedIn: true, errorMessage: "All fields must contain a value" })

            })
            .catch(error => {
                console.error('Error on POST /user/lunchmenu/edit/:itemId editing menu item:', error);
                // res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to create menu item' });
            });
        return
    }
    Menu.findByIdAndUpdate(itemId, {
        menuType,
        category,
        calories,
        itemName: itemName.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        description: description.replace(/^\s+|\s+$/g, '').charAt(0).toUpperCase() + description.replace(/^\s+|\s+$/g, '').slice(1).toLowerCase()
    }, { new: true })
        .then(udpated => {
            udpated.edit = false
            console.log('Edited Menu Item =====>', udpated)
            res.redirect('/admin/user/lunchmenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to create menu item' });
        });
})
// -------------------------------------------------

router.get('/user/lunchmenu/delete/:itemId', (req, res, next) => {
    const { itemId } = req.params
    Menu.findByIdAndDelete(itemId)
        .then(deleted => {
            console.log("Deleted =====> ", deleted);
            res.redirect('/admin/user/lunchmenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to Delete menu item' });
        });
})

// Post #2

//done
router.get('/user/dinnermenu/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;

    Menu.find({ menuType: 'Dinner' })
        .then(menuItems => {
            const itemCount = menuItems.length
            res.render('menus/edit-dinner-menu', { isLoggedIn, admin: true, menuItems, itemCount })
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            res.render('error', { isLoggedIn, admin: true, menuItems, itemCount, errorMessage: 'Failed to fetch menu items' });
        });
})

//done
router.post('/user/dinnermenu/edit', isLoggedIn, (req, res, next) => {
    const { menuType, category, calories, itemName, description } = req.body
    console.log('Received Post Data:', req.body)

    if (!menuType || !category || !calories || !itemName || !description) {
        res.redirect('/admin/user/dinnermenu/edit')
        return;
    }

    Menu.create({
        menuType: menuType,
        category: category,
        calories: calories,
        itemName: itemName.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        description: description.replace(/^\s+|\s+$/g, '').charAt(0).toUpperCase() + description.replace(/^\s+|\s+$/g, '').slice(1).toLowerCase()
    })

        .then(newItem => {
            return Menu.find({ menuType: 'Dinner' });
        })
        .then(menuItems => {
            // res.render('menus/edit-lunch-menu', { menuItems, itemCount: menuItems.length, isLoggedIn: true });
            res.redirect('/admin/user/dinnermenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to create menu item' });
        });
})

//done
router.get('/user/dinnermenu/edit/:itemId', isLoggedIn, (req, res, next) => {
    const itemId = req.params.itemId
    console.log('get itemId:', itemId)
    Menu.findById(itemId)
        .then(menuItem => {
            menuItem.edit = true
            console.log('Menu Item:', menuItem)
            const { menuType, category, calories, itemName, description, edit, _id } = menuItem;
            res.render('menus/edit-dinner-menu', { menuType, category, calories, itemName, description, edit, _id, isLoggedIn: true })
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to create menu item' });
        });
})

//done
// -----------------------------------------------------------------------
router.post('/user/dinnermenu/edit/:itemId', isLoggedIn, (req, res, next) => {
    const { itemId } = req.params
    const { menuType, category, calories, itemName, description } = req.body;
    if (!itemName || !description) {

        Menu.findById(itemId)
            .then(menuItem => {
                menuItem.edit = true
                return res.render('menus/edit-dinner-menu', { ...menuItem._doc, isLoggedIn: true, errorMessage: "All fields must contain a value" })

            })
            .catch(error => {
                console.error('Error on POST /user/dinnermenu/edit/:itemId editing menu item:', error);
                // res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to create menu item' });
            });
        return
    }
    Menu.findByIdAndUpdate(itemId, {
        menuType,
        category,
        calories,
        itemName: itemName.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        description: description.replace(/^\s+|\s+$/g, '').charAt(0).toUpperCase() + description.replace(/^\s+|\s+$/g, '').slice(1).toLowerCase()
    }, { new: true })
        .then(udpated => {
            udpated.edit = false
            console.log('Edited Menu Item =====>', udpated)
            res.redirect('/admin/user/dinnermenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to edit menu item' });
        });
})

//not done
router.get('/user/dinnermenu/delete/:itemId', (req, res, next) => {
    const { itemId } = req.params
    Menu.findByIdAndDelete(itemId)
        .then(deleted => {
            console.log("Deleted =====> ", deleted);
            res.redirect('/admin/user/dinnermenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to Delete menu item' });
        });
})

// ----------------------------------------------------------------------------
router.get('/user/rewards/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    res.render('rewards/edit-rewards', { isLoggedIn, admin: true })
})



router.get('/user/dinnermenu/edit', isLoggedIn, (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false;
    Menu.find({ menuType: 'Dinner' })
        .then(menuItems => {
            const itemCount = menuItems.length
            res.render('menus/edit-dinner-menu', { isLoggedIn, admin: true, menuItems, itemCount })
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            res.render('error', { errorMessage: 'Failed to fetch menu items' });
        });
})

router.get('/user/lunchmenu/filter', (req, res, next) => {
    const { categoryFilter } = req.query
    let { itemNameFilter, selected } = req.query
    itemNameFilter = itemNameFilter.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    if (itemNameFilter.length < 1 && categoryFilter === "All Categories") {
        Menu.find({ menuType: "Lunch" })
            .then(menuItems => {
                const itemCount = menuItems.length
                console.log("FILTER =====>", { menuItems });
                selected = "All Categories"
                res.render('menus/edit-lunch-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return

    }
    if (itemNameFilter.length < 1 && categoryFilter !== "All Categories") {
        Menu.find({ category: categoryFilter, menuType: "Lunch" })
            .then(menuItems => {
                const itemCount = menuItems.length
                selected = categoryFilter
                console.log("FILTER =====>", { menuItems });
                res.render('menus/edit-lunch-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length && categoryFilter === "All Categories") {
        Menu.find({ itemName: { "$regex": `${itemNameFilter}`, "$options": "i" }, menuType: "Lunch" })
            .then(menuItems => {
                const itemCount = menuItems.length
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { menuItems });
                res.render('menus/edit-lunch-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }

    if (itemNameFilter.length && categoryFilter !== "All Categories") {
        Menu.find({ itemName: { "$regex": `${itemNameFilter}`, "$options": "i" }, category: categoryFilter, menuType: "Lunch" })
            .then(menuItems => {
                const itemCount = menuItems.length
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { menuItems });

                res.render('menus/edit-lunch-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
})
router.get('/user/dinnermenu/filter', (req, res, next) => {
    const { categoryFilter } = req.query
    let { itemNameFilter, selected } = req.query
    itemNameFilter = itemNameFilter.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    if (itemNameFilter.length < 1 && categoryFilter === "All Categories") {
        Menu.find({ menuType: "Dinner" })
            .then(menuItems => {
                const itemCount = menuItems.length
                console.log("FILTER =====>", { menuItems });
                selected = "All Categories"
                res.render('menus/edit-dinner-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return

    }
    if (itemNameFilter.length < 1 && categoryFilter !== "All Categories") {
        Menu.find({ category: categoryFilter, menuType: "Dinner" })
            .then(menuItems => {
                const itemCount = menuItems.length
                selected = categoryFilter
                console.log("LINE 267 FILTER =====>", { menuItems });
                res.render('menus/edit-dinner-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
    if (itemNameFilter.length && categoryFilter === "All Categories") {
        Menu.find({ itemName: { "$regex": `${itemNameFilter}`, "$options": "i" }, menuType: "Dinner" })
            .then(menuItems => {
                selected = categoryFilter
                const itemCount = menuItems.length
                console.log("LINE 267 FILTER =====>", { menuItems });
                res.render('menus/edit-dinner-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }

    if (itemNameFilter.length && categoryFilter !== "All Categories") {
        Menu.find({ itemName: { "$regex": `${itemNameFilter}`, "$options": "i" }, category: categoryFilter, menuType: "Dinner" })
            .then(menuItems => {
                selected = categoryFilter
                const itemCount = menuItems.length
                console.log("LINE 267 FILTER =====>", { menuItems });
                res.render('menus/edit-dinner-menu', { menuItems, itemNameFilter, selected, itemCount, isLoggedIn: true })
            })
            .catch(err => console.log(err))
        return
    }
})


router.post('/user/rewards/edit', (req, res, next) => {
    const { rewardType, rewardName, rewardDescription, rewardPoints } = req.body
    console.log('Received Post Data:', req.body.rewardPoints)

    if (!rewardType || !rewardName || !rewardDescription) {
        res.redirect('/admin/user/rewards/edit')
        return;
    }

    Reward.create({
        rewardType,
        rewardName: rewardName.replace(/^\s+|\s+$/g, '').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
        rewardDescription: rewardDescription.replace(/^\s+|\s+$/g, '').charAt(0).toUpperCase() + rewardDescription.replace(/^\s+|\s+$/g, '').slice(1).toLowerCase(),
        points: rewardPoints
    })
        .then(createdRewards => {
            console.log('Created Reward ====>', createdRewards);
            res.render('rewards/edit-rewards', { isLoggedIn: true});
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('rewards/edit-rewards', { isLoggedIn: true, errorMessage: 'Failed to create new reward item' });
        });
})

module.exports = router;