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

  create(createRequestDto: CreateRequestDto) {
    const request = this.requestsRepository.create({
      ...createRequestDto,
      status: 'pending',
    });
    return this.requestsRepository.save(request);
  }

  findAll() {
    return this.requestsRepository.find();
  }

  findOne(id: number) {
    return this.requestsRepository.findOne({ where: { id } });
  }

  findByStudent(studentId: number) {
    return this.requestsRepository.find({ where: { studentId } });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    await this.findOne(id);
    await this.requestsRepository.update(id, updateRequestDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.requestsRepository.delete(id);
  }
}