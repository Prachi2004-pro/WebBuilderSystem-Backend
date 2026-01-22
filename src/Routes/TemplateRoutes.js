const express = require('express');
const { CreateTemplate, updateTemplate, deleteTemplate, getTemplateById, getTemplateList } = require('../Controllers/templateController');
const auth = require('../Middlewares/auth');
const upload = require('../Middlewares/multer');

const templateRouter = express.Router();
templateRouter.post(
  "/create",
  auth,
  upload.single("heroImage"),
  CreateTemplate
);

// UPDATE (also allow image update later)
templateRouter.put(
  "/update/:id",
  auth,
  upload.single("heroImage"),
  updateTemplate
);
templateRouter.delete("/delete/:id",auth, deleteTemplate);
templateRouter.get("/list",auth, getTemplateList);
templateRouter.get("/:id",auth, getTemplateById);

module.exports = templateRouter;