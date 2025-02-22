require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('../config/db'); // Ensure DB connection

const recipes = [
    {
      "recipeName": "Lamb Shawarma",
      "ingredients": ["Lamb", "Garlic", "Yogurt", "Lemon Juice", "Spices"],
      "cookingTime": 90,
      "difficulty": "Hard",
      "cuisine": "Middle Eastern",
      "description": "Tender marinated lamb cooked on a spit, served with pita and tahini sauce.",
      "photoLink": "https://picsum.photos/seed/lambshawarma/600/400",
      "averageRating": 4.7
    },
    {
      "recipeName": "Sushi Rolls",
      "ingredients": ["Sushi Rice", "Seaweed", "Fish", "Cucumber", "Avocado"],
      "cookingTime": 40,
      "difficulty": "Medium",
      "cuisine": "Japanese",
      "description": "Delicious rolls of vinegared rice with fresh fish and veggies.",
      "photoLink": "https://picsum.photos/seed/sushi/600/400",
      "averageRating": 4.8
    },
    {
      "recipeName": "Paella",
      "ingredients": ["Rice", "Shrimp", "Chicken", "Saffron", "Peas"],
      "cookingTime": 60,
      "difficulty": "Hard",
      "cuisine": "Spanish",
      "description": "A traditional Spanish rice dish with seafood, chicken, and saffron.",
      "photoLink": "https://picsum.photos/seed/paella/600/400",
      "averageRating": 4.8
    },
    {
      "recipeName": "Moussaka",
      "ingredients": ["Eggplant", "Ground Beef", "Tomato Sauce", "Bechamel Sauce", "Cheese"],
      "cookingTime": 90,
      "difficulty": "Hard",
      "cuisine": "Greek",
      "description": "A layered casserole with eggplant, spiced ground beef, and creamy béchamel sauce.",
      "photoLink": "https://picsum.photos/seed/moussaka/600/400",
      "averageRating": 4.7
    },
    {
      "recipeName": "Ratatouille",
      "ingredients": ["Zucchini", "Eggplant", "Tomatoes", "Bell Peppers", "Herbs"],
      "cookingTime": 60,
      "difficulty": "Medium",
      "cuisine": "French",
      "description": "A colorful vegetable stew filled with fresh herbs and Mediterranean flavors.",
      "photoLink": "https://picsum.photos/seed/ratatouille/600/400",
      "averageRating": 4.6
    },
    {
      "recipeName": "Banh Mi",
      "ingredients": ["Baguette", "Pork", "Pickled Vegetables", "Coriander", "Chili"],
      "cookingTime": 30,
      "difficulty": "Medium",
      "cuisine": "Vietnamese",
      "description": "A Vietnamese sandwich with marinated pork, pickled veggies, and spicy herbs.",
      "photoLink": "https://picsum.photos/seed/banhmi/600/400",
      "averageRating": 4.8
    },
    {
      "recipeName": "Beef Wellington",
      "ingredients": ["Beef Tenderloin", "Puff Pastry", "Mushrooms", "Prosciutto", "Dijon Mustard"],
      "cookingTime": 120,
      "difficulty": "Hard",
      "cuisine": "British",
      "description": "A luxurious dish of beef tenderloin wrapped in prosciutto and puff pastry.",
      "photoLink": "https://picsum.photos/seed/beefwellington/600/400",
      "averageRating": 4.9
    },
    {
      "recipeName": "Tiramisu",
      "ingredients": ["Mascarpone", "Ladyfingers", "Coffee", "Cocoa Powder", "Sugar"],
      "cookingTime": 20,
      "difficulty": "Medium",
      "cuisine": "Italian",
      "description": "A creamy dessert made with coffee-soaked ladyfingers and mascarpone cream.",
      "photoLink": "https://picsum.photos/seed/tiramisu/600/400",
      "averageRating": 4.9
    },
    {
        "recipeName": "Kimchi Fried Rice",
        "ingredients": ["Rice", "Kimchi", "Egg", "Soy Sauce", "Sesame Oil"],
        "cookingTime": 25,
        "difficulty": "Easy",
        "cuisine": "Korean",
        "description": "A flavorful fried rice dish with tangy kimchi and a fried egg on top.",
        "photoLink": "https://picsum.photos/seed/kimchifriedrice/600/400",
        "averageRating": 4.6
      },
      {
        "recipeName": "Pad Thai",
        "ingredients": ["Rice Noodles", "Shrimp", "Peanuts", "Egg", "Bean Sprouts"],
        "cookingTime": 40,
        "difficulty": "Medium",
        "cuisine": "Thai",
        "description": "A sweet and savory stir-fried noodle dish with peanuts and lime.",
        "photoLink": "https://picsum.photos/seed/padthai/600/400",
        "averageRating": 4.8
      },
      {
        "recipeName": "Peking Duck",
        "ingredients": ["Duck", "Hoisin Sauce", "Pancakes", "Cucumber", "Green Onion"],
        "cookingTime": 150,
        "difficulty": "Hard",
        "cuisine": "Chinese",
        "description": "A crispy roasted duck dish served with thin pancakes and hoisin sauce.",
        "photoLink": "https://picsum.photos/seed/pekingduck/600/400",
        "averageRating": 4.9
      },
      {
        "recipeName": "Bibimbap",
        "ingredients": ["Rice", "Vegetables", "Egg", "Gochujang", "Beef"],
        "cookingTime": 35,
        "difficulty": "Medium",
        "cuisine": "Korean",
        "description": "A colorful mixed rice bowl topped with a fried egg and spicy sauce.",
        "photoLink": "https://picsum.photos/seed/bibimbap/600/400",
        "averageRating": 4.7
      },
      {
        "recipeName": "Butter Chicken",
        "ingredients": ["Chicken", "Tomato Sauce", "Butter", "Cream", "Spices"],
        "cookingTime": 50,
        "difficulty": "Medium",
        "cuisine": "Indian",
        "description": "A rich and creamy tomato-based curry with tender chicken pieces.",
        "photoLink": "https://picsum.photos/seed/butterchicken/600/400",
        "averageRating": 4.9
      },
      {
        "recipeName": "Pho",
        "ingredients": ["Beef", "Rice Noodles", "Broth", "Basil", "Lime"],
        "cookingTime": 120,
        "difficulty": "Hard",
        "cuisine": "Vietnamese",
        "description": "A fragrant noodle soup with slow-cooked beef and fresh herbs.",
        "photoLink": "https://picsum.photos/seed/pho/600/400",
        "averageRating": 4.8
      },
      {
        "recipeName": "Falafel",
        "ingredients": ["Chickpeas", "Garlic", "Parsley", "Cumin", "Tahini"],
        "cookingTime": 45,
        "difficulty": "Medium",
        "cuisine": "Middle Eastern",
        "description": "Crispy fried chickpea balls served with tahini sauce and pita.",
        "photoLink": "https://picsum.photos/seed/falafel/600/400",
        "averageRating": 4.7
      },
      {
        "recipeName": "Carbonara",
        "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Black Pepper"],
        "cookingTime": 30,
        "difficulty": "Medium",
        "cuisine": "Italian",
        "description": "A creamy pasta dish made with eggs, pancetta, and cheese.",
        "photoLink": "https://picsum.photos/seed/carbonara/600/400",
        "averageRating": 4.9
      },
      {
        "recipeName": "Goulash",
        "ingredients": ["Beef", "Paprika", "Potatoes", "Carrots", "Tomatoes"],
        "cookingTime": 90,
        "difficulty": "Hard",
        "cuisine": "Hungarian",
        "description": "A hearty stew with tender beef and rich paprika-infused sauce.",
        "photoLink": "https://picsum.photos/seed/goulash/600/400",
        "averageRating": 4.7
      },
      {
        "recipeName": "Baklava",
        "ingredients": ["Phyllo Dough", "Nuts", "Honey", "Butter", "Cinnamon"],
        "cookingTime": 60,
        "difficulty": "Hard",
        "cuisine": "Turkish",
        "description": "A sweet and crispy pastry filled with nuts and soaked in honey syrup.",
        "photoLink": "https://picsum.photos/seed/baklava/600/400",
        "averageRating": 4.8
      }

  ];
  
Recipe.insertMany(recipes)
    .then(() => {
        console.log("Recipes added successfully!");
        mongoose.connection.close();
    })
    .catch(err => console.error("Error inserting recipes:", err));
