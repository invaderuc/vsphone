const Phone = require("../models/phone");
const User = require("../models/user");
const slugify = require("slugify");
//const { GET_ASYNC, SET_ASYNC } = require("../redis/index");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.name);
    const newPhone = await new Phone(req.body).save();
    res.json(newPhone);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create phone failed");
    res.status(400).json({
      err: err.message,
      code: err.code,
    });
  }
};

exports.listAll = async (req, res) => {
  let phones = await Phone.find({ status: "Active" })
    .limit(parseInt(req.params.count))
    .populate("brand")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(phones);
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Phone.findOneAndDelete({slug:req.params.slug});
    res.json(deleted);
  }catch(err){
    res.status(400).send("Phone eliminated");
  }
};

exports.removeSoft = async (req, res) => {
  try {
    const deleted = await Phone.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { status: "Inactive" },
      { new: true }
    ).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Phone delete failed");
  }
};

exports.read = async (req, res) => {
  const phone = await Phone.findOne({ slug: req.params.slug, status: "Active" })
    .populate("brand")
    .exec();
  res.json(phone);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Phone.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PHONE UPDATE ERROR ----> ", err);
    // return res.status(400).send("Phone update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// WITH PAGINATION
exports.list = async (req, res) => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; // 3

    const phones = await Phone.find({ status: "Active" })
      .skip((currentPage - 1) * perPage)
      .populate("brand")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(phones);
  } catch (err) {
    console.log(err);
  }
};

exports.phonesCount = async (req, res) => {
  let total = await Phone.find({ status: "Active" }).estimatedDocumentCount().exec();
  res.json(total);
};

exports.listRelated = async (req, res) => {
  const phone = await Phone.findById(req.params.phoneId).exec();
console.log(phone,"jojo");
  const related = await Phone.find({
    _id: { $ne: phone._id },
    brand: phone.brand,
    status: "Active",
  })
    .limit(3)
    .populate("brand")
    .exec();

  res.json(related);
};

// SEARCH / FILTER

const handleQuery = async (req, res, query) => {
  const phones = await Phone.find({ $text: { $search: query }, status: "Active" })
    .populate("brand")
    .exec();

  res.json(phones);
};

const handlePrice = async (req, res, price) => {
  try {
    let phones = await Phone.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
      status: "Active",
    })
      .populate("brand")
      .exec();

    res.json(phones);
  } catch (err) {
    console.log(err);
  }
};

const handleBrand = async (req, res, brand) => {
  try {
    let phones = await Phone.find({ brand, status: "Active" })
      .populate("brand")
      .exec();

    res.json(phones);
  } catch (err) {
    console.log(err);
  }
};

exports.searchFilters = async (req, res) => {
  const { query, price, brand } =
    req.body;

  if (query) {
    console.log("query --->", query);
    await handleQuery(req, res, query);
  }

  // price [20, 200]
  if (price !== undefined) {
    console.log("price ---> ", price);
    await handlePrice(req, res, price);
  }

  if (brand) {
    console.log("brand ---> ", brand);
    await handleBrand(req, res, brand);
  }
};
