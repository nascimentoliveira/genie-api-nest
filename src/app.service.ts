import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Resource } from 'hal';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async checkHealth() {
    const statusAPI = {
      description: 'Genie-API',
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
    try {
      await this.prisma.$connect();
      const healthResource = new Resource(statusAPI);
      healthResource.link('self', '/api/health', { method: 'GET' });
      healthResource.link('documentation', '/api/docs', { method: 'GET' });
      return healthResource;
    } catch (error) {
      statusAPI.status = 'unhealthy';
      statusAPI.database = 'disconnected';
      const healthResource = new Resource(statusAPI);
      healthResource.link('self', '/api/health', { method: 'GET' });
      healthResource.link('documentation', '/api/docs', { method: 'GET' });
      throw new HttpException(healthResource, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
