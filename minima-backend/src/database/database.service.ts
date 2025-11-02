import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(DatabaseService.name);

    async onModuleInit() {
        try {
            const dbUrl = process.env.DATABASE_URL;
            if (!dbUrl) {
                const errorMsg = 'DATABASE_URL environment variable is not set';
                this.logger.error(errorMsg);
                throw new Error(errorMsg);
            }
       
            const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ':****@');
      
            await this.$connect();
            this.logger.log('Database connected successfully');
        } catch (error) {
            this.logger.error('Failed to connect to database', {
                message: error?.message,
                code: error?.code,
                meta: error?.meta,
            });
 
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Database disconnected');
    }
}
    