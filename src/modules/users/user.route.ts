import { Router } from "express";

// import validateRequest from "../../middlewares/validateRequest";

import userController from "./user.controller";

import { createUserValidation, updateUserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validate.middleware";

const router = Router();

router.post("/", validateRequest(createUserValidation), userController.create);

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.patch(
  "/:id",
  validateRequest(updateUserValidation),
  userController.update,
);

router.delete("/:id", userController.delete);

export default router;
