const express = require("express");
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { create, list, read, update, remove, removeSoft,listAll,brandsCount } = require("../Controllers/brand");

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Create Brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Brand"
 *     responses:
 *       200: 
 *         description: Create new brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Brand"
 *       400:
 *         description: bad request
 * /brand/{slug}/:  
 *   put:
 *     summary: Update Brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Brand"
 *     responses:
 *       200: 
 *         description: Update already sotred brand
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Brand
 *     tags: [Brand]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of brand to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Brand"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Brand
 *     tags: [Brand]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of brand to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Brand
 *     tags: [Brand]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of brand to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /brands:
 *   get:
 *     summary: List of Brands
 *     tags: [Brand]
 *     responses:
 *       200: 
 *         description: List of Brands
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Brand"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Brand"
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
 * /brands/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Brand]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Brand"
 *       400:
 *         description: bad request  
 */

// endpoints
router.post("/brand", authCheck, adminCheck,create);
router.get("/brand/:slug", read);
router.put("/brand/:slug", update);
router.patch("/brand/:slug", removeSoft);
router.delete("/brand/:slug", remove); 

router.get("/brands", listAll);
router.get("/brands/total", brandsCount);
router.post("/brands", list);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
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
 *         status:
 *            type: string
 *            default: "Active"
 *            enum:
 *            - "Active"
 *            - "Inactive"
 *       example:
 *         name: Xiaomi
 *         slug: xiaomi
 *         status: Active    
 */

module.exports = router;