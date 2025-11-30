import { Router } from "express";
import { Request, Response } from "express";
import { verifyToken } from "../middlewares/authMiddleware.ts";
import { db } from "../db/db.ts";
import { users } from "../db/schema.ts";
import { eq } from "drizzle-orm";

const router = Router();

// Utility function to remove password from user object
const sanitizeUser = (user: any) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

router.get("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, req.user.id));

    if (user.length <= 0) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User profile", user: sanitizeUser(user[0]) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const result = await db
      .update(users)
      .set(data)
      .where(eq(users.id, req.user.id))
      .returning();

    if (result.length <= 0) {
      return res.status(400).json({ message: "User not found or update failed" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: sanitizeUser(result[0]),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/profile", verifyToken, async (req: Request, res: Response) => {
  try {
    const result = await db.delete(users).where(eq(users.id, req.user.id)).returning();

    if (result.length <= 0) {
      return res.status(400).json({ message: "User not found or deletion failed" });
    }

    return res.status(200).json({ message: "User deleted successfully", user: sanitizeUser(result[0]) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { router as userRoutes };
