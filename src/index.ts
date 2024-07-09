import app from './app';
import prisma from './database';

const server = app.listen(app.get('port'), () => {
    console.log(`Initializing app at port ${app.get('port')}`);
});

const shutdownServer = async (): Promise<void> => {
    try {
        await prisma.$disconnect();
        server.close(() => {
            console.log('Closing server...');
            process.exit(0);
        });
    } catch (error) {
        throw new Error(error as string);
    }
};

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);
