import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HealthErrorResponseDTO, HealthOkResponseDTO } from './dtos/health.dto';

@ApiTags('Health')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check API status' })
  @ApiResponse({
    status: 200,
    description: 'Status checked successfully.',
    type: HealthOkResponseDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: HealthErrorResponseDTO,
  })
  @Get('health')
  checkHealth() {
    return this.appService.checkHealth();
  }
}
