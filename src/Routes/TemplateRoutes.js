const express = require("express");
const {
  CreateTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateById,
  getTemplateList,
  updateTemplateStatus,
  getPublishedTemplateById,
} = require("../Controllers/templateController");
const auth = require("../Middlewares/auth");
const upload = require("../Middlewares/multer");

const templateRouter = express.Router();

// CREATE
templateRouter.post(
  "/create",
  auth,
  upload.single("heroImage"),
  CreateTemplate,
);

// UPDATE (also allow image update later)
templateRouter.put(
  "/update/:id",
  auth,
  upload.single("heroImage"),
  updateTemplate,
);

// Update template status
templateRouter.patch("/status/:id", auth, updateTemplateStatus);

// DELETE
templateRouter.delete("/delete/:id", auth, deleteTemplate);

// GET ALL TEMPLATES FOR A USER
templateRouter.get("/list", auth, getTemplateList);

// GET TEMPLATE BY ID
templateRouter.get("/:id", auth, getTemplateById);

// Public GET published template by id
templateRouter.get("/public/:id", getPublishedTemplateById);

module.exports = templateRouter;
