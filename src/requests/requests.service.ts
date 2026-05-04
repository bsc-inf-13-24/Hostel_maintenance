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

  // =========================
  // CREATE — student submits request
  // =========================
  async create(createRequestDto: CreateRequestDto): Promise<any> {

    // 🔍 STEP 1: check for duplicate (same room + issue + still pending)
    const existing = await this.requestsRepository.findOne({
      where: {
        roomNumber: createRequestDto.roomNumber,
        issueType: createRequestDto.issueType,
        status: 'pending',
      },
    });

    if (existing) {
      return {
        message: 'Similar issue already reported and still pending',
        existingRequest: existing,
      };
    }

    // 🆕 STEP 2: create new request
    const request = this.requestsRepository.create({
      ...createRequestDto,
      status: 'pending', // automatically assigned
    });

    return await this.requestsRepository.save(request);
  }

  // =========================
  // READ ALL — admin view (with priority)
  // =========================
  async findAll(): Promise<any[]> {
    const requests = await this.requestsRepository.find();

    return this.addPriority(requests);
  }

  // =========================
  // READ ONE — by id
  // =========================
  async findOne(id: number): Promise<any> {
    const request = await this.requestsRepository.findOne({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException(`Request with id ${id} not found`);
    }

    return this.addPriority([request])[0];
  }

  // =========================
  // READ BY STUDENT
  // =========================
  async findByStudent(studentId: number): Promise<any[]> {
    const requests = await this.requestsRepository.find({
      where: { studentId },
    });

    return this.addPriority(requests);
  }

  // =========================
  // UPDATE — admin updates (status mostly)
  // =========================
  async update(id: number, updateRequestDto: UpdateRequestDto): Promise<any> {
    await this.findOne(id);

    // optional: normalize status to lowercase
    if (updateRequestDto.status) {
      updateRequestDto.status = updateRequestDto.status.toLowerCase();
    }

    await this.requestsRepository.update(id, updateRequestDto);

    return this.findOne(id);
  }

  // =========================
  // DELETE — admin only
  // =========================
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);

    await this.requestsRepository.delete(id);

    return { message: `Request ${id} deleted successfully` };
  }

  // =========================
  // 🔥 HELPER: ADD PRIORITY
  // =========================
  private addPriority(requests: Request[]): any[] {
    const now = new Date();

    return requests.map((req) => {
      const created = new Date(req.createdAt);

      const days =
        (now.getTime() - created.getTime()) / (1000 * 3600 * 24);

      let priority = 'low';

      if (days >= 7) priority = 'urgent';
      else if (days >= 4) priority = 'high';
      else if (days >= 2) priority = 'medium';

      return {
        ...req,
        priority,
      };
    });
  }
}