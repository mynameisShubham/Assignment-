const express=require('express');
const Product=require('../models/product');
const Category=require('../models/category');
const routes=express.Router()



// Create a new category
routes.post('/category', async (req, res) => {
    const category = new Category({ 
      category_name: req.body.category_name
   });
    await category.save();
      res.send(category);
  });
  
  // Get all categories  
  routes.get('/category', async (req, res) => {
    try{
      const categories = await Category.find();
      res.send(categories);
    }catch(err){
      res.send(err)
    }
  });
  
  
  
  
  // Get category by id  
  routes.get('/category/:id', async (req, res) => {
    try{
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).send('Category not found.');
      res.send(category);
    }catch(err){
      res.send(err)
    }
  });
  
  // Update category by id  
  routes.put('/category/:id', async (req, res) => {
    try{
      const category = await Category.findByIdAndUpdate(req.params.id, { category_name: req.body.category_name }, { new: true });
      if (!category) return res.status(404).send('Category not found.');
      res.send(category);
    }catch(err){
      res.send(err)
    }
  });
  
  
  // Delete category by id   
  routes.delete('/category/:id', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('Category not found.');
    res.send(category);

  });
  
  
  
  
  
  // Create a new product  
  routes.post('/product', async (req, res) => {
      try{
          const category = await Category.findById(req.body.categoryId);
          if (!category) return res.status(400).send('Invalid category.');
          
          const product = new Product({ product_name: req.body.product_name, categoryId: req.body.categoryId });
          await product.save();
          res.send(product);
      }catch(err){
          res.send({err,status:'Product Not Found.'})
      }
  });
  
  // Get all products 
  routes.get('/product', async (req, res) => {
      try{
        const {page=1,limit=10}=req.query
        const productList = await Product.find().populate('categoryId', 'category_name')
        .limit(limit*1).skip((page-1)*limit);
          
          res.send({Total :productList.length,productList});
          
      }
      catch(err){
          res.send({err,status:'Product Not Found.'})
      }
  });
  
  
  
  
  // Get product by id 
  routes.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('categoryId', 'category_name');
    if (!product) return res.status(404).send('Product not found.');
    res.send(product);
  });
  
  
  // Update product by id   
  routes.put('/product/:id', async (req, res) => {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send('Invalid category.');
  
    const product = await Product.findByIdAndUpdate(req.params.id, { product_name: req.body.product_name, categoryId: req.body.categoryId }, { new: true }).populate('categoryId', 'name');
    if (!product) return res.status(404).send('Product not found.');
    res.send(product);
  });
  
  // Delete product by id  
  routes.delete('/product/:id', async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send('Product not found.');
    res.send(product);
  });
  

module.exports=routes;  