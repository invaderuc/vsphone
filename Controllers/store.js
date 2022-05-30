const Store = require("../models/store");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {

    req.body.slug = slugify(req.body.name);

    const newStore = await new Store(req.body).save();
    res.json(newStore);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.listAll = async (req, res) => {
  let stores = await Store.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(stores);
};

exports.storesCount = async (req, res) => {
  let total = await Store.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Store.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("La Tienda no pudo ser eliminada");
  }
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Store.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("El Tienda no pudo ser eliminadas");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Store.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("La tienda no pudo ser eliminado");
  }
};

exports.read = async (req, res) => {
  const store = await Store.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(store);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Store.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    if(updated){
      res.json(updated);
    }else{
      return res.status(406).send("La tienda que intenta editar no existe.");
    }
  } catch (err) {
    console.log("Store error al actualizar: ", err);
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

    const Stores = await Store.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(Stores);
  } catch (err) {
    console.log(err);
  }
};