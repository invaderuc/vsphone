const express = require("express");
const router = express.Router();

const { create, list, read, update, remove, removeSoft,listAll,storesCount } = require("../Controllers/store");

/**
 * @swagger
 * /store:
 *   post:
 *     summary: Create Store
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Store"
 *     responses:
 *       200: 
 *         description: Create new store
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Store"
 *       400:
 *         description: bad request
 * /store/{slug}/:  
 *   put:
 *     summary: Update Store
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Store"
 *     responses:
 *       200: 
 *         description: Update already sotred store
 *       400:
 *         description: bad request   
 *   get:
 *     summary: get Store
 *     tags: [Store]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of store to return"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Store"
 *       400:
 *         description: bad request    
 *   patch:
 *     summary: Soft delete Store
 *     tags: [Store]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of store to soft delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 *   delete:
 *     summary: Hard delete Store
 *     tags: [Store]
 *     parameters:
 *     - name: "slug"
 *       in: "path"
 *       description: "SLUG of store to delete"
 *       required: true
 *       type: "string"
 *     responses:
 *       200: 
 *         description: ok
 *       400:
 *         description: bad request   
 * /stores:
 *   get:
 *     summary: List of Stores
 *     tags: [Store]
 *     responses:
 *       200: 
 *         description: List of Stores
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Store"
 *       400:
 *         description: bad request 
 *   post:
 *     summary: List brans paginator
 *     tags: [Store]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Store"
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
 * /stores/total:
 *   get:
 *     summary: Count active brads
 *     tags: [Store]
 *     responses:
 *       200: 
 *         description: Return numeric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Store"
 *       400:
 *         description: bad request  
 */

// endpoints
router.post("/store", create);
router.get("/store/:slug", read);
router.put("/store/:slug", update);
router.patch("/store/:slug", removeSoft);
router.delete("/store/:slug", remove); 

router.get("/stores", listAll);
router.get("/stores/total", storesCount);
router.post("/stores", list);

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
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