import { Router } from "express";
import { RoleRoutes } from "../modules/roles";
import { UserRoutes } from "../modules/users";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Ecommerce API..",
  });
});

router.use("/roles", RoleRoutes);
router.use("/users", UserRoutes);

export default router;
