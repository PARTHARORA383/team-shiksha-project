
import { Request, Response } from "express";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from "../db/db.ts";
import { users } from "../db/schema.ts";
import { eq } from 'drizzle-orm';
import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
  profile: z.string().optional(),
  profilePic: z.string().url({ message: "Invalid URL" }).optional(),
});


export const signupHandler = async (req: Request, res: Response) => {

  try {

    const { email, password, name, profile, profilePic } = signupSchema.parse(req.body)

    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const [user] = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
        profile,
        profilePic
      })
      .returning();

    if (!user) {
      return res.status(500).json({
        message: "Error creating user",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  }

  catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Zod validation error'
      });
    }

    return res.status(500).json({
      message: 'Internal server error'
    })
  }
}


export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const loginHandler = async (req: Request, res: Response) => {

  try {
    const { email, password } = loginSchema.parse(req.body);


    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length == 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const existingUser = user[0]


    const isPasswordValid = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      {
        id: existingUser.id, email: existingUser.email
      },
      process.env.JWT_SECRET!, {
      expiresIn: "7d"
    }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });


  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Zod validation error'

      });
    }
    console.error(e);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }

}