const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft,listAll,ispsCount } = require("../Controllers/isp");

/**
 * @swagger
 * /isp:
 *   post:
 *     summary: Create Isp
 *     tags: [Isp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Isp"
 *     responses:
 *       200: 
 *         description: Create new isp
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Isp"
 *       400:
 *         description: bad request
 * /isp/{slug}/:  
 *   put:
 *     summary: Update Isp
 *     tags: [Isp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Isp"
 *     responses:
 *       200: 
 *         description: Update already sotred isp
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Isp
 *     tags: [Isp]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of isp to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Isp"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Isp
 *     tags: [Isp]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of isp to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Isp
 *     tags: [Isp]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of isp to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /isps:
 *   get:
 *     summary: List of Isps
 *     tags: [Isp]
 *     responses:
 *       200: 
 *         description: List of Isps
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Isp"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Isp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Isp"
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
 * /isps/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Isp]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Isp"
 *       400:
 *         description: bad request  
 */

// endpoints
router.post("/isp", create);
router.get("/isp/:slug", read);
router.put("/isp/:slug", update);
router.patch("/isp/:slug", removeSoft);
router.delete("/isp/:slug", remove); 

router.get("/isps", listAll);
router.get("/isps/total", ispsCount);
router.post("/isps", list);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Isp:
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
 *         name: VTR
 *         slug: vtr
 *         status: Active    
 */

module.exports = router;