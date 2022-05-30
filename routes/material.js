const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft,listAll,materialsCount } = require("../Controllers/material");

/**
 * @swagger
 * /material:
 *   post:
 *     summary: Create Material
 *     tags: [Material]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Material"
 *     responses:
 *       200: 
 *         description: Create new material
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Material"
 *       400:
 *         description: bad request
 * /material/{slug}/:  
 *   put:
 *     summary: Update Material
 *     tags: [Material]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Material"
 *     responses:
 *       200: 
 *         description: Update already sotred material
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Material
 *     tags: [Material]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of material to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Material"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Material
 *     tags: [Material]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of material to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Material
 *     tags: [Material]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of material to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /materials:
 *   get:
 *     summary: List of Materials
 *     tags: [Material]
 *     responses:
 *       200: 
 *         description: List of Materials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Material"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Material]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Material"
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
 * /materials/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Material]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Material"
 *       400:
 *         description: bad request  
 */

// endpoints
router.post("/material", create);
router.get("/material/:slug", read);
router.put("/material/:slug", update);
router.patch("/material/:slug", removeSoft);
router.delete("/material/:slug", remove); 

router.get("/materials", listAll);
router.get("/materials/total", materialsCount);
router.post("/materials", list);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Material:
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