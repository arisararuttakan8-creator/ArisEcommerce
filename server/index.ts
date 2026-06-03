import 'dotenv/config'
import app from './app.js'
import { prisma } from './lib/prisma.js';

const PORT = Number(process.env.PORT) || 3001;

async function connectDatabase() {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log('Prisma connected to PostgreSQL');
    
}

async function main() {
    await connectDatabase();
    const server = app.listen(PORT,()=>{
        console.log(`API server running at http://localhost:${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/api/health`);
    })
}

main().catch((err)=>{
    console.error('Failed to start server:',err);
})