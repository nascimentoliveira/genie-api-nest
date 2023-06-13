import { ApiProperty } from '@nestjs/swagger';

export class HealthOkResponseDTO {
  @ApiProperty({ example: 'Genie-API' })
  description: string;

  @ApiProperty({ example: 'healthy' })
  status: string;

  @ApiProperty({ example: 'connected' })
  database: string;

  @ApiProperty({ example: '2023-06-11T15:31:41.220Z' })
  timestamp: string;
}

export class HealthErrorResponseDTO {
  @ApiProperty({ example: 'Genie-API' })
  description: string;

  @ApiProperty({ example: 'unhealthy' })
  status: string;

  @ApiProperty({ example: 'disconnected' })
  database: string;

  @ApiProperty({ example: '2023-06-11T15:31:41.220Z' })
  timestamp: string;
}
