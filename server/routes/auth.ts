import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { signToken } from '../lib/auth.js'

const router = Router();

router.post(
    '/signup',
    asyncHandler( async (req, res) => {
        const { email, password, firstName, lastName} = req.body as {
            email?: string;
            password?: string;
            firstName?: string;
            lastName?: string;

        };

        const normalizedEmail = email?.trim().toLowerCase();
        if( !normalizedEmail || !password || password.length < 6){
            res.status(400).json({ error: 'Valid email and password (min 6 characters) are required.'})
            return;
        }

        const existing = await prisma.user.findUnique({ where : {email : normalizedEmail}});
        if( existing ){
            res.status(409).json({ error : 'An account with this email already exists.' })
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                password : passwordHash,
                firstName: firstName?.trim() || null,
                lastName: lastName?.trim() || null,
            },
        })

        const token = signToken({ userId: user.id , email : user.email });
        res.status(201).json({
            token,
            user: { id: user.id , email: user.email , firstName: user.firstName , lastName: user.lastName },
        })  
    })  
)

export default router;