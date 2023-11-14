import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { EmailEntity } from './email.entity';
import { IEmail, IEmailFilters, EmailId } from './email.interfaces';

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(EmailEntity)
        private readonly emailRepository: Repository<EmailEntity>,
      ) {}

    /**
     * Récupère un utilisateur par rapport à un identifiant
     * @param id Identifiant du mail à récupérer
     * @returns Le mail correspondant à l'identifiant ou undefined
     */
    get(id: EmailId): Promise<IEmail> {
    return this.emailRepository.findOneBy({ id: Equal(id) });
    }
}
