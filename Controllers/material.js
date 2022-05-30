const Material = require("../models/material");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {

    req.body.slug = slugify(req.body.name);

    const newMaterial = await new Material(req.body).save();
    res.json(newMaterial);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.listAll = async (req, res) => {
  let materials = await Material.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(materials);
};


exports.materialsCount = async (req, res) => {
  let total = await Material.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Material.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Material no pudo ser eliminado");
  }
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Material.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("El material no pudo ser eliminado");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Material.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Material no pudo ser eliminado");
  }
};

exports.read = async (req, res) => {
  const material = await Material.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(material);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Material.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    if(updated){
      res.json(updated);
    }else{
      return res.status(406).send("Material que intenta editar no existe");
    }
  } catch (err) {
    console.log("Material error al actualizar: ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.list = async (req, res) => {
  console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;

    const perPage = 2;
    let currentPage = page >= 1 ? page : 1;

    const Materials = await Material.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(Materials);
  } catch (err) {
    console.log(err);
  }
};