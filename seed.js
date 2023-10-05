require('dotenv').config()
const mongoose = require('mongoose');

const Menu = require('./models/Menu.js');

// ℹ️ Connects to the database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.log(`An error occurred while connecting to the Database: ${err}`);
  });


const menus = [
    {
        "menuType": "Lunch",
        "itemName": "Crispy Chicken Schnitzel",
        "category": "Plates",
        "description": "Crispy chicken schnitzel",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Grilled Chicken",
        "category": "Bowls",
        "description": "Grilled chicken",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Falafel (plate)",
        "category": "Plates",
        "description": "Falafel",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Chicken Shawarma (plate)",
        "category": "Plates",
        "description": "Chicken shawarma",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Chicken Shawarma",
        "category": "Bowls",
        "description": "Chicken shawarma",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Crunchy Cabbage",
        "category": "Salads",
        "description": "Crispy shallots, toasted almonds, mint leaves, ja’ala seed mix, mint honey vinaigrette.",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Lamb Shawarma",
        "category": "Bowls",
        "description": "Lamb shawarma",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Summer",
        "category": "Salads",
        "description": "Watermelon, pistachio, feta and nana.",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Za'atar Greek",
        "category": "Salads",
        "description": "Cucumber, tomatoes, kalamata olives, red onion, goat feta, lemon, za’atar spice mix",
        "calories": 1000,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Halloumi",
        "category": "Salads",
        "description": "Arugula, parsley, cilantro nana.",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Israeli",
        "category": "Salads",
        "description": "Tomatoes, cucumber, parsley, scallions, olive oil, bell peppers, mixed greens, cabbage",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Beet And Arugula",
        "category": "Salads",
        "description": "Goat cheese",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Lebanese Veggie Crudites",
        "category": "Cold Mezzes",
        "description": "Raw veggie crudités for dipping",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "House Made Pickles",
        "category": "Cold Mezzes",
        "description": "Your choice, mixed pickles or just pickles",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Tzatziki",
        "category": "Cold Mezzes",
        "description": "Labneh, cucumber, dill, olive oil",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Babaganoush",
        "category": "Cold Mezzes",
        "description": "Grilled eggplant dip, pomegranate, za’atar",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Labneh Za'atar",
        "category": "Cold Mezzes",
        "description": "Olive oil, za'atar",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Cauliflower Tabouleh",
        "category": "Cold Mezzes",
        "description": "Pine nuts, parsley, mint, scallions, sumac",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Matboucha",
        "category": "Cold Mezzes",
        "description": "Spicy organic tomato dip",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Roasted Eggplant",
        "category": "Cold Mezzes",
        "description": "Tahini, sumac, pine nuts, mint",
        "calories": 1000,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Smashed Avocado",
        "category": "Cold Mezzes",
        "description": "Avocado mix, pickled carrots",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Lamb Shawarma (plate)",
        "category": "Plates",
        "description": "Lamb shawarma",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Fennel Pomegranate",
        "category": "Salads",
        "description": "Fennel, orange, pomegranate, goat cheese, sumac candied pecans, and lettuce.",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Crispy Cauliflower",
        "category": "Hot Mezzes",
        "description": "Spicy harissa honey glaze, fresh mint",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Grilled Halloumi",
        "category": "All Day Brunch",
        "description": "Grilled halloumi cheese",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Falafel ( Hot Mezzes )",
        "category": "Hot Mezzes",
        "description": "Tahini",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Lahmajun Chips",
        "category": "Hot Mezzes",
        "description": "Beef baharat pita chips, harissa aioli",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Salmon Skewers",
        "category": "Hot Mezzes",
        "description": "Aleppo, sumac, anise, basil, orange zest",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Crispy Eggplant",
        "category": "Hot Mezzes",
        "description": "Crispy japanese eggplant, tzatziki",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Cauliflower Couscous",
        "category": "Hot Mezzes",
        "description": "Carrots, herbs and fresh spices",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Moroccan Cigars",
        "category": "Hot Mezzes",
        "description": "Beef and lamb cigar rolled phyllo, tahini, s’chug, preserved lemon, pine nuts",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Chicken Shish Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 1000,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Beef Kufta Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "10oz Ribeye Steak Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Turkish Lamb Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Baby Lambchops",
        "category": "Entrees",
        "description": "Majadra rice and sumac onions",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Moroccan Fish",
        "category": "Entrees",
        "description": "Salmon",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Hummus Tehina",
        "category": "Hummus",
        "description": "Tahini, olive oil, pine nuts, s’chug",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Cole Slaw",
        "category": "Cold Mezzes",
        "description": "Cabbage, jicama, green apple, parsley, cilantro, scallion, celery seed",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Motek Sampler Plate",
        "category": "Cold Mezzes",
        "description": "Hummus, babaganoush, eggplant salad, israeli salad, pita",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Hummus Masabacha",
        "category": "Hummus",
        "description": "Overnight cooked chickpeas, hard boiled egg, pine nuts, sumac onion, parsley",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Crispy Schnitzel",
        "category": "Sandwiches",
        "description": "Challah bread, cabbage slaw, pickles, tomato, sumac onion, harissa aioli",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Spicy Schnitzel & Eggplant",
        "category": "Sandwiches",
        "description": "Challah bread, matboucha, crispy eggplant, hot green pepper, tahini",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Falafel ( Sandwiches )",
        "category": "Sandwiches",
        "description": "Tahini, israeli salad, crispy eggplants, radish",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Chicken Shawarma ( Sandwiches )",
        "category": "Sandwiches",
        "description": "Pita, amba aioli, pickled onion",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Chicken Tahini Wrap",
        "category": "Sandwiches",
        "description": "Grilled chicken, baby greens, oven roasted tomatoes, pita croutons, cabbage, lemon tahini",
        "calories": 1000,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Moroccan Salmon Wrap",
        "category": "Sandwiches",
        "description": "Harissa honey salmon, baby greens, mint, oven roasted tomatoes, tahini, pita croutons, cabbage, harissa aiol",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Eggplant & Egg Sabich",
        "category": "Sandwiches",
        "description": "Sabich with roasted eggplant, egg, hummus, amba aioli",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Lamb Shawarma ( Sandwiches )",
        "category": "Sandwiches",
        "description": "Arugula, tomato, sumac onion, tahini, amba sauce",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Ribeye On Baguette",
        "category": "Sandwiches",
        "description": "Jerusalem bread, caramelized onion, tomato, cabbage, pickles, garlic cilantro, sumac",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Wagyu",
        "category": "Burgers",
        "description": "Jerusalem bun, caramelized onion, tomato, lettuce, pickles pomegranate mint aioli",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Arayes",
        "category": "Burgers",
        "description": "Pita, beef kufta kebab, tahini, harissa aioli",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Veggie Arayes",
        "category": "Burgers",
        "description": "Pita, vegan ‘impossible’ meat, tahini",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Za'atar Fries",
        "category": "Sides",
        "description": "Za'atar fries",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Fries",
        "category": "Sides",
        "description": "Fries",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Yellow Majadra Rice",
        "category": "Sides",
        "description": "Yellow majadra rice",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Nana Rice",
        "category": "Sides",
        "description": "Nana rice",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Hummus Roasted Eggplant",
        "category": "Hummus",
        "description": "Cherry tomato, amba aioli, pine nuts, pickled onions",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Hummus Mushroom",
        "category": "Hummus",
        "description": "Caramelized onions, pine nuts, parsley, s’chug",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Malabi Israeli Panacotta",
        "category": "Sweets",
        "description": "Coconuts, raspberry sauce, house made almond pistachio",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Halva Silan Ice Cream",
        "category": "Sweets",
        "description": "Vanilla ice cream, shaved halva, candied sumac pecans, silan",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Turkish Baklava",
        "category": "Sweets",
        "description": "Phyllo, rose syrup, pistachio. served 2 per order",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Chocolate Rugelach",
        "category": "Sweets",
        "description": "Freshly baked mini chocolate rugelach",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Berry Basil",
        "category": "Smoothies",
        "description": "Berry basil",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Banana Tahini Silan",
        "category": "Smoothies",
        "description": "Banana tahini silan",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Kale Y Piña",
        "category": "Smoothies",
        "description": "Kale y piña",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Vanilla Rose",
        "category": "Specialty Lattes",
        "description": "Vanilla rose",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Matcha Tea",
        "category": "Specialty Lattes",
        "description": "Matcha tea",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Turkish Mocha",
        "category": "Specialty Lattes",
        "description": "Turkish mocha",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Turkish Mocha Hot Chocolate",
        "category": "Specialty Lattes",
        "description": "Turkish mocha hot chocolate",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Rimonana",
        "category": "Tea",
        "description": "Rimonana",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Nana Mint",
        "category": "Tea",
        "description": "Nana mint",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Hibiscus",
        "category": "Tea",
        "description": "Hibiscus",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Black English",
        "category": "Tea",
        "description": "Black english",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Lebanese Veggie Crudites",
        "category": "Cold Mezzes",
        "description": "Raw veggie crudités for dipping",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "House Made Pickles",
        "category": "Cold Mezzes",
        "description": "Your choice, mixed pickles or just pickles",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Tzatziki",
        "category": "Cold Mezzes",
        "description": "Labneh, cucumber, dill, olive olly",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Babaganoush",
        "category": "Cold Mezzes",
        "description": "Grilled eggplant dip, pomegranate, za'atar",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Labneh Za'atar",
        "category": "Cold Mezzes",
        "description": "Olive oil, za'atar",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Babka Bread Pudding",
        "category": "Sweets",
        "description": "Chocolate fudge bread pudding and vanilla ice cream",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Knafeh",
        "category": "Sweets",
        "description": "Kataifi shredded phyllo, cheese, pistachio and vanilla rose syrup",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Matboucha",
        "category": "Cold Mezzes",
        "description": "Spicy organic tomato dip",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Roasted Eggplant",
        "category": "Cold Mezzes",
        "description": "Tahini, sumac, pine nuts, mint",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Smashed Avocado",
        "category": "Cold Mezzes",
        "description": "Avocado mix, pickled carrots",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Cole Slaw",
        "category": "Cold Mezzes",
        "description": "Cabbage, jicama, green apple, parsley, cilantro, scallion, celery seed",
        "calories": 1000,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Crispy Cauliflower",
        "category": "Hot Mezzes",
        "description": "Spicy harissa honey glaze, fresh mint",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Grilled Halloumi",
        "category": "Hot Mezzes",
        "description": "Grilled halloumi cheese",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Falafel",
        "category": "Hot Mezzes",
        "description": "Tahini",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Moroccan Cigars",
        "category": "Hot Mezzes",
        "description": "Beef and lamb cigar rolled phyllo, tahini, s'chug, preserved lemon, pine nuts",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Lahmajun Chips",
        "category": "Hot Mezzes",
        "description": "Beef baharat pita chips, harissa aioli",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Malawach Yemenite Pancake",
        "category": "All Day Brunch",
        "description": "Flakey pancake, spicy grated tomato, tahini, and organic 'happy' egg",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Salmon Skewers",
        "category": "Hot Mezzes",
        "description": "Aleppo, sumac, anise, basil, orange zest",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Crispy Eggplant",
        "category": "Hot Mezzes",
        "description": "Crispy japanese eggplant, tzatziki",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Cauliflower Couscous",
        "category": "Hot Mezzes",
        "description": "Carrots, herbs and fresh spices",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Crispy Schnitzel",
        "category": "Sandwiches",
        "description": "Challah bread, cabbage slaw, pickles, tomato, sumac onion, harissa aioli",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Spicy Schnitzel & Eggplant",
        "category": "Sandwiches",
        "description": "Challah bread, matboucha, crispy eggplant, hot green pepper, tahini",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Chicken Shawarma",
        "category": "Sandwiches",
        "description": "Pita, amba aioli, pickled onion",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Falafel Sandwich",
        "category": "Sandwiches",
        "description": "Tahini, israeli salad, crispy eggplants, radish",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Chicken Tahini Wrap",
        "category": "Sandwiches",
        "description": "Grilled chicken, baby greens, oven roasted tomatoes, pita croutons, cabbage, lemon tahini",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Moroccan Salmon Wrap",
        "category": "Sandwiches",
        "description": "Harissa honey salmon, baby greens, mint, oven roasted tomatoes, tahini, pita croutons, cabbage, harissa aioli",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Eggplant & Egg Sabich",
        "category": "Sandwiches",
        "description": "Sabich with roasted eggplant, egg, hummus, amba aioli",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Lamb Shawarma",
        "category": "Sandwiches",
        "description": "Arugula, tomato, sumac onion, tahini, amba sauce",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Ribeye On Baguette",
        "category": "Sandwiches",
        "description": "Jerusalem bread, caramelized onion, tomato, cabbage, pickles, garlic cilantro, sumac",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Crispy Chicken Schnitzel",
        "category": "Plates",
        "description": "--",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Chicken | Shawarma",
        "category": "Plates",
        "description": "--",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Falafel Plate",
        "category": "Plates",
        "description": "--",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Lamb | Shawarma",
        "category": "Plates",
        "description": "--",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Crunchy Cabbage",
        "category": "Salads",
        "description": "Crispy shallots, toasted almonds, mint leaves, ja'ala seed mix, mint honey vinaigrette",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Motek Sampler Plate",
        "category": "Cold Mezzes",
        "description": "Hummus, babaganoush, eggplant salad, israeli salad, pita",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Cauliflower Tabouleh",
        "category": "Cold Mezzes",
        "description": "Pine nuts, parsley, mint, scallions, sumac",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Halloumi",
        "category": "Salads",
        "description": "Arugula, parsley, cilantro, nana",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Za'atar Greek",
        "category": "Salads",
        "description": "Cucumber, tomatoes, kalamata olives, red onion, goat feta, lemon, za'atar spice mix",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Israeli",
        "category": "Salads",
        "description": "Tomatoes, cucumber, parsley, scallions, olive oil, bell peppers, mixed greens, cabbage",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Beet And Arugula",
        "category": "Salads",
        "description": "Goat cheese",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Chicken Shish Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Beef Kufta Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Baby Lambchops",
        "category": "Entrees",
        "description": "Majadra rice and sumac onions",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "10oz Ribeye Steak Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Turkish Lamb Kebab",
        "category": "Entrees",
        "description": "Salad of arugula, sumac onion, cherry tomatoes",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Moroccan Fish",
        "category": "Entrees",
        "description": "Salmon",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Wagyu",
        "category": "Burgers",
        "description": "Jerusalem bun, caramelized onion, tomato, lettuce, pickles pomegranate mint aioli",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Arayes",
        "category": "Burgers",
        "description": "Pita, beef kufta kebab, tahini, harissa aioli",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Veggie Arayes",
        "category": "Burgers",
        "description": "Pita, vegan 'impossible' meat, tahini",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Hummus Tehina",
        "category": "Hummus",
        "description": "Tahini, olive oil, pine nuts, s'chug",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Hummus Masabacha",
        "category": "Hummus",
        "description": "Overnight cooked chickpeas, hard boiled egg, pine nuts, sumac onion, parsley",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Hummus Mushroom",
        "category": "Hummus",
        "description": "Caramelized onions, pine nuts, parsley, s'chug",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Roasted | Eggplant",
        "category": "Hummus",
        "description": "Cherry tomato, amba aioli, pine nuts, pickled onions",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Za'atar Fries",
        "category": "Sides",
        "description": "--",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Fries",
        "category": "Sides",
        "description": "--",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Yellow Majadra Rice",
        "category": "Sides",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Nana Rice",
        "category": "Sides",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Babka Bread Pudding",
        "category": "Sweets",
        "description": "Chocolate fudge bread pudding and vanilla ice cream",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Knafeh",
        "category": "Sweets",
        "description": "Kataifi shredded phyllo, cheese, pistachio and vanilla rose syrup",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Malabi Israeli Panacotta",
        "category": "Sweets",
        "description": "Coconuts, raspberry sauce, house made almond pistachio",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Halva Silan Ice Cream",
        "category": "Sweets",
        "description": "Vanilla ice cream, shaved halva, candied sumac pecans, silan",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Turkish Baklava",
        "category": "Sweets",
        "description": "Phyllo, rose syrup, pistachio. served 2 per order",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Chocolate Rugelach",
        "category": "Sweets",
        "description": "Freshly baked mini chocolate rugelach",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Berry Basil",
        "category": "Smoothies",
        "description": "--",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Banana Tahini Silan",
        "category": "Smoothies",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Espresso",
        "category": "Coffee",
        "description": "--",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Colada",
        "category": "Coffee",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Fennel Pomegranate",
        "category": "Salads",
        "description": "Fennel, orange, pomegranate, goat cheese, sumac candied pecans, and lettuce",
        "calories": 750,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Summer",
        "category": "Salads",
        "description": "Watermelon, pistachio, feta and nana",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Cold Brew",
        "category": "Coffee",
        "description": "--",
        "calories": 1000,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Capuccino",
        "category": "Coffee",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Latte",
        "category": "Coffee",
        "description": "--",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Americano",
        "category": "Coffee",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Turkish Coffee",
        "category": "Coffee",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Vanilla Rose",
        "category": "Specialty Lattes",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Matcha Tea",
        "category": "Specialty Lattes",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Turkish Mocha",
        "category": "Specialty Lattes",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Hummus Shakshuka",
        "category": "All Day Brunch",
        "description": "Our signature shakshuka centered in hummus, freshly baked challah and tahini.",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Turkish Mocha Hot Chocolate",
        "category": "Specialty Lattes",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Shakshuka",
        "category": "All Day Brunch",
        "description": "Organic pasture raised eggs in a homemade spicy fresh tomato sauce, tahini, challah",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Cortado",
        "category": "Coffee",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Dinner",
        "itemName": "Macchiato",
        "category": "Coffee",
        "description": "--",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Avocado Toast",
        "category": "All Day Brunch",
        "description": "Jerusalem toast, ja’ala seed mix, pickled cauliflower red fresno pepper, nana mint, cilantro",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Israeli Breakfast",
        "category": "All Day Brunch",
        "description": "3 eggs any style, israeli salad, labneh, avocado mix, tahini, feta, jerusalem bread",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Jerusalem Grilled Cheese",
        "category": "All Day Brunch",
        "description": "Mozzarella cheese, oven roasted tomato, olives, and shifka aioli",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Faroe Island Salmon",
        "category": "Bowls",
        "description": "Fish",
        "calories": 500,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Falafel",
        "category": "Bowls",
        "description": "Falafel",
        "calories": 250,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Sabich Eggplant & Egg",
        "category": "Bowls",
        "description": "Sabich eggplant & egg",
        "calories": 100,
        "edit": false
    },
    {
        "menuType": "Lunch",
        "itemName": "Jerusalem Lox & Bagel",
        "category": "All Day Brunch",
        "description": "Freshly baked jerusalem baged, labneh, nova smoked salmon, tomato, red onion, capers",
        "calories": 250,
        "edit": false
    }
]

Menu.create(menus)
  .then(dbMenu => {
    console.log(`Created ${dbMenu.length} menuItems`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating fake users in the DB: ${err}`));
