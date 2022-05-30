const Operador = require("../models/isp");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {

    req.body.slug = slugify(req.body.name);
    const newOperador = await new Operador(req.body).save();
    res.json(newOperador);
  } catch (err) {

    if(err.code = 11000){
      return res.status(400).send(req.body.name + " name has been used before");
    }else{
      console.log(err);
      res.status(400).json({
        err: err.message,
        code: err.code,
      });
    }
  }
};

exports.listAll = async (req, res) => {
  let isps = await Operador.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(isps);
};


exports.ispsCount = async (req, res) => {
  let total = await Operador.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Operador.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Operador no pudo ser eliminado");
  }
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Operador.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("An error occurred while deleting");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Operador.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("An error occurred while deleting");
  }
};

exports.read = async (req, res) => {
  const isp = await Operador.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(isp);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Operador.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    if(updated){
      res.json(updated);
    }else{
      return res.status(406).send("an error occurred while updating");
    }
  } catch (err) {
    console.log("Operador error al actualizar: ", err);
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

    const Isps = await Operador.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(Isps);
  } catch (err) {
    console.log(err);
  }
};