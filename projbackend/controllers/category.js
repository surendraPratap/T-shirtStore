// const category = require("../models/category");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id).exec( (err, cate) =>{
        if(err){
            return res.status(400).json({ error :"Category not found in DB"})
        }
        req.category =cate;
        next();
    })
   
}

exports.createCategory = (req, res) =>{
    const category = new Category(req.body);
    category.save( (err, category)=>{
        if(err){
            return res.status(400).json({ error :"Not able to save category in DB"})
        }
        res.json({category});

    } )
}

exports.getCategory = (req, res) =>{
    return res.json(req.category);
    
}

exports.getAllCategory = (req, res) =>{

    Category.find().exec( (err, itemCategories)=>{
        if(err){
            return res.status(400).json({ error :"No category found"})
        }
        res.json(itemCategories);
    });
}
exports.updateCategory =(req, res) =>{
    const category = req.category; 
    category.name = req.body.name 

    category.save( (err, updateCategory) =>{
        if(err){
            return res.status(400).json({ error :"Fail to update category"})
        }
        res.json(updateCategory);
    })
}

exports.removeCategory = (req, res) =>{
    const category = req.category; 
    category.remove( (err, category)=>{
        if(err){
            return res.status(400).json({ error :"Fail to Remove this category"})
        }
        res.json({ message : category.name + " category  Successfully removed "});
    })
}