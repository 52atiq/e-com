import { Router } from "express";
import roleController from "./role.controller";
import validateRequest from "../../middlewares/validate.middleware";
import { createRoleValidation, updateRoleValidation } from "./role.validation";


const router = Router();

router.post("/",validateRequest(createRoleValidation), roleController.create);

router.get("/", roleController.getAll);

router.get("/:id", roleController.getById);

router.patch("/:id", validateRequest(updateRoleValidation),  roleController.update);

router.delete("/:id", roleController.delete);

export default router;
