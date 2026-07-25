import { Router } from "express";
import { RoleRoutes } from "../modules/roles";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Ecommerce API..",
  });
});

router.use("/roles", RoleRoutes);

export default router;
