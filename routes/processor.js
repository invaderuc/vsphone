const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft,listAll,processorsCount } = require("../Controllers/processor");

/**
 * @swagger
 * /processor:
 *   post:
 *     summary: Create Processor
 *     tags: [Processor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Processor"
 *     responses:
 *       200: 
 *         description: Create new processor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Processor"
 *       400:
 *         description: bad request
 * /processor/{slug}/:  
 *   put:
 *     summary: Update Processor
 *     tags: [Processor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Processor"
 *     responses:
 *       200: 
 *         description: Update already sotred processor
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Processor
 *     tags: [Processor]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of processor to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Processor"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Processor
 *     tags: [Processor]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of processor to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Processor
 *     tags: [Processor]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of processor to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /processors:
 *   get:
 *     summary: List of Processors
 *     tags: [Processor]
 *     responses:
 *       200: 
 *         description: List of Processors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Processor"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Processor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Processor"
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
 * /processors/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Processor]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Processor"
 *       400:
 *         description: bad request  
 */

// endpoints
router.post("/processor", create);
router.get("/processor/:slug", read);
router.put("/processor/:slug", update);
router.patch("/processor/:slug", removeSoft);
router.delete("/processor/:slug", remove); 

router.get("/processors", listAll);
router.get("/processors/total", processorsCount);
router.post("/processors", list);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Processor:
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
 *         name: Intel core 3
 *         slug: intel-core-3
 *         status: Active    
 */

module.exports = router;