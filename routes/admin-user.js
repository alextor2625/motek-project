var express = require('express');
var router = express.Router();

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard')
const User = require('../models/User')
const Menu = require('../models/Menu')


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
            res.render('menus/edit-lunch-menu', { isLoggedIn, admin: true, menuItems, itemCount })
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
        itemName: itemName,
        description: description
    })

        .then(newItem => {
            return Menu.find({ menuType: 'Lunch' });
        })
        .then(menuItems => {
            // res.render('menus/edit-lunch-menu', { menuItems, itemCount: menuItems.length, isLoggedIn: true });
            res.redirect('/admin/user/lunchmenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-lunch-menu', { errorMessage: 'Failed to create menu item' });
        });

    Menu.findOneAndUpdate({ menuType, category, calories, itemName, description }, { new: true })
        .then(updatedItem => {
            console.log('Menu Item Updated: ', updatedItem);
            return res.render('menus/edit-lunch-menu', { menuType, category, calories, itemName, description, isLoggedIn: true })
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
router.post('/user/lunchmenu/edit/:itemId', isLoggedIn, (req, res, next) => {
    const itemId = req.params.itemId
    const { menuType, category, calories, itemName, description } = req.body;
    Menu.findByIdAndUpdate(itemId, { menuType, category, calories, itemName, description }, { new: true })
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

// router.post('/user/dinnermenu/edit', isLoggedIn, (req, res, next) => {
//     const { menuType, category, calories, itemName, description } = req.body
//     console.log('Received Post Data:', req.body)

//     if (!menuType || !category || !calories || !itemName || !description) {
//         res.render('menus/edit-dinner-menu', { errorMessage: 'Missing categories' });
//         return;
//     }

//     Menu.create({
//         menuType: menuType,
//         category: category,
//         calories: calories,
//         itemName: itemName,
//         description: description
//     })

//         .then(newItem => {
//             return Menu.find({
//                 menuType: 'Dinner'
//             });
//         })
//         .then(menuItems => {
//             res.render('menus/edit-dinner-menu', { menuItems, itemCount: menuItems.length });
//         })
//         .catch(error => {
//             console.error('Error creating menu item:', error);
//             res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to create menu item' });
//         });
// })

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
        itemName: itemName,
        description: description
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

    Menu.findOneAndUpdate({ menuType, category, calories, itemName, description }, { new: true })
        .then(updatedItem => {
            console.log('Menu Item Updated: ', updatedItem);
            return res.render('menus/edit-dinner-menu', { menuType, category, calories, itemName, description, isLoggedIn: true })
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
router.post('/user/dinnermenu/edit/:itemId', isLoggedIn, (req, res, next) => {
    const itemId = req.params.itemId
    const { menuType, category, calories, itemName, description } = req.body;
    Menu.findByIdAndUpdate(itemId, { menuType, category, calories, itemName, description }, { new: true })
        .then(udpated => {
            udpated.edit = false
            console.log('Edited Menu Item =====>', udpated)
            res.redirect('/admin/user/dinnermenu/edit')
        })
        .catch(error => {
            console.error('Error creating menu item:', error);
            res.render('menus/edit-dinner-menu', { errorMessage: 'Failed to create menu item' });
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



module.exports = router;