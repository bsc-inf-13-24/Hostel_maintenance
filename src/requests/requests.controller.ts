import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  // POST /requests — create a new maintenance request (student)
  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  // GET /requests — get all requests (admin view)
  @UseGuards(AuthGuard('jwt'))
@Get()
findAll() {
  return this.requestsService.findAll();
}

  // GET /requests/student/:id — get requests by student ID
  @Get('student/:id')
  findByStudent(@Param('id') id: string) {
    return this.requestsService.findByStudent(+id);
  }

  // GET /requests/:id — get one request
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }

  // PATCH /requests/:id — update a request (admin updates status)
 @UseGuards(AuthGuard('jwt'))
@Patch(':id')
update(
  @Param('id') id: string,
  @Body() updateRequestDto: UpdateRequestDto,
) {
  return this.requestsService.update(+id, updateRequestDto);
}

  // DELETE /requests/:id — delete a request (admin only)
 @UseGuards(AuthGuard('jwt'))
@Delete(':id')
remove(@Param('id') id: string) {
  return this.requestsService.remove(+id);
}
}