const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
// be sure to include its associated Product data
  try {
    const getTagData = await Tag.findAll({ include: [{ model: Product }]});
    return res.status(200).json(getTagData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id', async (req, res) => {
    try {
      const getTagID = await Tag.findByPk(req.params.id, {include: [{ model: Product }]
    });
      if (!getTagID) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      return res.status(200).json(getTagID);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const CreateTag = await Tag.create(req.body);
    return res.status(200).json(CreateTag);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const UpdateTag = await Tag.update(req.body, {where: {id: req.params.id,},});
    if (!UpdateTag[0]) {
      res.status(404).json({message: 'No tag with this ID.'});
      return;
    }
    return res.status(200).json(UpdateTag);
  }catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({where: {id: req.params.id}});
    if (!deleteTag) {
      res.status(404).json({message: 'No tag found with this ID!'});
      return;
    }
    return res.status(200).json(deleteTag);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
