const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft,listAll,featuresCount } = require("../Controllers/feature");

/**
 * @swagger
 * /feature:
 *   post:
 *     summary: Create Feature
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Feature"
 *     responses:
 *       200: 
 *         description: Create new feature
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Feature"
 *       400:
 *         description: bad request
 * /feature/{slug}/:  
 *   put:
 *     summary: Update Feature
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Feature"
 *     responses:
 *       200: 
 *         description: Update already sotred feature
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Feature
 *     tags: [Feature]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of feature to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Feature"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Feature
 *     tags: [Feature]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of feature to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Feature
 *     tags: [Feature]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of feature to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /features:
 *   get:
 *     summary: List of Features
 *     tags: [Feature]
 *     responses:
 *       200: 
 *         description: List of Features
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Feature"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Feature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Feature"
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
 * /features/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Feature]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Feature"
 *       400:
 *         description: bad request  
 */


// endpoints
router.post("/feature", create);
router.get("/feature/:slug", read);
router.put("/feature/:slug", update);
router.patch("/feature/:slug", removeSoft);
router.delete("/feature/:slug", remove); 

router.get("/features", listAll);
router.get("/features/total", featuresCount);
router.post("/features", list);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Feature:
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
 *         name: Carga Rápida
 *         slug: carga-rapida
 *         status: Active    
 */

module.exports = router;