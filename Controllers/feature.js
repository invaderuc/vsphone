const Feature = require("../models/feature");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {

    req.body.slug = slugify(req.body.name);

    const newFeature = await new Feature(req.body).save();
    res.json(newFeature);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.listAll = async (req, res) => {
  let features = await Feature.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(features);
};


exports.featuresCount = async (req, res) => {
  let total = await Feature.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Feature.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Feature no pudo ser eliminado");
  }
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Feature.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("El feature no pudo ser eliminado");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Feature.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Feature no pudo ser eliminado");
  }
};

exports.read = async (req, res) => {
  const feature = await Feature.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(feature);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Feature.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    if(updated){
      res.json(updated);
    }else{
      return res.status(406).send("Feature que intenta editar no existe.");
    }
  } catch (err) {
    console.log("Feature error al actualizar: ", err);
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

    const Features = await Feature.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(Features);
  } catch (err) {
    console.log(err);
  }
};