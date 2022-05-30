const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { create, list, read, update, remove, removeSoft,listAll,phonesCount,listRelated,searchFilters } = require("../Controllers/phone");


/**
 * @swagger
 * /phone:
 *   post:
 *     summary: Create Phone
 *     tags: [Phone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Phone"
 *     responses:
 *       200: 
 *         description: Create new phone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Phone"
 *       400:
 *         description: bad request
 * /phone/{slug}/:  
 *   put:
 *     summary: Update Phone
 *     tags: [Phone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Phone"
 *     responses:
 *       200: 
 *         description: Update already sotred phone
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Phone
 *     tags: [Phone]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of phone to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Phone"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Phone
 *     tags: [Phone]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of phone to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Phone
 *     tags: [Phone]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of phone to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /phones:
 *   get:
 *     summary: List of Phones
 *     tags: [Phone]
 *     responses:
 *       200: 
 *         description: List of Phones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Phone"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Phone]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Phone"
 *     responses:
 *       200: 
 *         description: List brans paginator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  sort:
 *                    type: "integer"
 *                    format: "int64"
 *                  order:
 *                    type: "integer"
 *                    format: "int64"
 *                  page:
 *                    type: "integer"
 *                    format: "int64"
 *       400:
 *         description: bad request
 * /phones/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Phone]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Phone"
 *       400:
 *         description: bad request  
 */

// endpoints
router.post("/phone", create);
router.get("/phone/:slug", read);
router.put("/phone/:slug", update);
router.patch("/product/:slug", authCheck, adminCheck, removeSoft);
router.delete("/product/:slug", authCheck, adminCheck, remove);

router.get("/phones/:count", listAll); // products/100
router.get("/phones/total", phonesCount);
router.post("/phones", list);

// related
router.get("/phone/related/:phoneId", listRelated);
// search
router.post("/search/filters", searchFilters);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Phone:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: "integer"
 *           format: "int64"
 *         name:
 *            type: string
 *            trim: true
 *            minlength: 2
 *            maxlength: 32
 *         slug:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true
 *         description:
 *            type: string
 *            unique: true
 *            lowercase: true
 *            index: true 
 *         price:
 *           type: "integer"
 *           format: "int64"
 *         battery:
 *           type: "integer"
 *           format: "int64"
 *         storage:
 *           type: "integer"
 *           format: "int64"
 *         ram:
 *           type: "integer"
 *           format: "int64"
 *         weight:
 *           type: "integer"
 *           format: "int64"
 *         high:
 *           type: "integer"
 *           format: "int64"
 *         width:
 *           type: "integer"
 *           format: "int64"
 *         length:
 *           type: "integer"
 *           format: "int64"
 *         status:
 *            type: string
 *            default: "Active"
 *            enum:
 *            - "Active"
 *            - "Inactive"
 *       example:
 *         _id: 1
 *         name: Iphone 99
 *         slug: iphone-99
 *         description: Este es el iphone 99    
 *         price: 1200
 *         battery: 2000
 *         storage: 128
 *         ram: 8
 *         weight: 12
 *         high: 12
 *         width: 11
 *         length: 5 
 *         brand: _id_brand  
 *         images: []  
 *         isps: []
 *         store: []  
 *         material: _id_material  
 */

module.exports = router;