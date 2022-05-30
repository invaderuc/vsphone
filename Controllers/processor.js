const Processor = require("../models/processor");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {

    req.body.slug = slugify(req.body.name);

    const newProcessor = await new Processor(req.body).save();
    res.json(newProcessor);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.listAll = async (req, res) => {
  let processors = await Processor.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(processors);
};

exports.processorsCount = async (req, res) => {
  let total = await Processor.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Processor.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Prosesador no pudo ser eliminado");
  }
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Processor.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("El Prosesador no pudo ser eliminado");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Processor.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Prosesador no pudo ser eliminado");
  }
};

exports.read = async (req, res) => {
  const processor = await Processor.findOne({
    slug: req.params.slug,
    status: "Active",
  }).exec();
  res.json(processor);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Processor.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    if(updated){
      res.json(updated);
    }else{
      return res.status(406).send("Prosesador que intenta editar no existe.");
    }
  } catch (err) {
    console.log("Prosesador error al actualizar: ", err);
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

    const Processors = await Processor.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(Processors);
  } catch (err) {
    console.log(err);
  }
};