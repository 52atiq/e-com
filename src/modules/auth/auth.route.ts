import { Router } from "express";
import authController from "./auth.controller";
import { registerValidation, loginValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validate.middleware";

const router = Router();

router.post(
  "/register",
  validateRequest(registerValidation),
  authController.register,
);

router.post("/login", validateRequest(loginValidation), authController.login);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

export default router;
