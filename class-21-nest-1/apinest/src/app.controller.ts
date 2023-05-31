import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ruta base /base

  // const router = Router()
  // router.get('/pets')
  @Get()
  getHello(): string {
    // res.status(400).json({})
    return this.appService.getHello(); // res.send('Hello World!')
  }
}
