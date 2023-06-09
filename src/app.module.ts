import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';
import { SubtasksModule } from './subtasks/subtasks.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			expandVariables: true
		}),
		PrismaModule,
		AuthModule,
		BoardsModule,
		UsersModule,
		TasksModule,
		SubtasksModule
	],
	providers: [PrismaService]
})
export class AppModule {}
