import { Router } from "express";
import { Prisma } from "@prisma/client/extension";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { prisma } from "../lib/prisma.js";

const router = Router();
router.get( 
    '/', 
    asyncHandler(async (_req, res) => {
        await prisma.$queryRaw`SELECT 1`;

        const userCount = prisma.user.count();

        res.json({
            status: 'ok',
            database: 'connected',
            userCount,
            timeStamp: new Date().toISOString(),
        });
    }),
);

export default router;