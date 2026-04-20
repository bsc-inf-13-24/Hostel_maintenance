import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  // CREATE — saves a new request to the database
  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const request = this.requestsRepository.create({
      ...createRequestDto,
      status: 'pending', // automatically set status
    });
    return await this.requestsRepository.save(request);
  }

  // READ ALL — fetches every row from the requests table (admin)
  async findAll(): Promise<Request[]> {
    return await this.requestsRepository.find();
  }

  // READ ONE — fetches a single request by its primary key
  async findOne(id: number): Promise<Request> {
    const request = await this.requestsRepository.findOne({ where: { id } });
    if (!request) throw new NotFoundException(`Request with id ${id} not found`);
    return request;
  }

  // READ BY STUDENT — fetches all requests for a specific student
  async findByStudent(studentId: number): Promise<Request[]> {
    return await this.requestsRepository.find({ where: { studentId } });
  }

  // UPDATE — changes specific fields on an existing request
  async update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request> {
    await this.findOne(id);
    await this.requestsRepository.update(id, updateRequestDto);
    return await this.findOne(id);
  }

  // DELETE — removes a request row from the database
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.requestsRepository.delete(id);
    return { message: `Request ${id} deleted successfully` };
  }
}