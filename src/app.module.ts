import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './requests/requests.module';
import { Request } from './requests/entities/request.entity';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'oracle',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT')|| '1521'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        serviceName: config.get('DB_SERVICE_NAME'),
        synchronize: config.get('DB_SYNCHRONIZE') === 'true',
        entities: [Request], // 👈 VERY IMPORTANT
        logging: true,
      }),
    }),

    // Your module
    RequestsModule,
  ],
})
export class AppModule {}