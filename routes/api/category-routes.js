const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
// be sure to include its associated Products
  try {
    const getCategoryData = await Category.findAll({ include: [{ model: Product }]});
    return res.status(200).json(getCategoryData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req,res) => {
    try {
      const GetcategoryID = await Category.findByPk(req.params.id, {include: [Product]});
      if (!GetcategoryID) {
        res.status(404).json({message: 'Category not found with this ID.'});
        return;
      }
      res.status(200).json(Category);
    } catch (err) {
      res.status(500).json(err);
    }
  })
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    return res.status(200).json(createCategory);
  } catch (err) {
    return res.status(400).json(err);
  }
});



router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {where: {id: req.params.id}});
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    return res.status(200).json(updateCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({where: {id: req.params.id}});
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with this ID.' });
      return;
    }
    return res.status(200).json(deleteCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});


module.exports = router;
