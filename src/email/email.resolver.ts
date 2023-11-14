import { NotImplementedException } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { EmailFiltersArgs, UserEmail } from './email.types';
import { EmailEntity } from './email.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { User } from '../user/user.types';
import { Equal, FindOptionsWhere, In, Like, Repository } from 'typeorm';


@Resolver(() => UserEmail)
export class EmailResolver {
  constructor(
    private readonly _service: EmailService,
    @InjectRepository(EmailEntity)
    private readonly emailRepository: Repository<EmailEntity>,
  ) {}


  @Query(() => UserEmail, { name: 'email' })
  getEmail(@Args({ name: 'emailId', type: () => ID }) emailId: string) {
    return this._service.get(emailId);
  }

  @Query(() => [UserEmail], { name: 'emailsList' })
  async getEmails(@Args() filters: EmailFiltersArgs): Promise<UserEmail[]> {

    const where: FindOptionsWhere<UserEmail> = {
      address : Like("%@%")
    };

    if (filters.address) {
      if (filters.address.equal && filters.address.in?.length > 0){
        where.address=Equal(filters.address.equal) && In(filters.address.in);
        }

      else if (filters.address.equal) {
        where.address = Equal(filters.address.equal);
      }

      else if (filters.address.in?.length > 0) {
        where.address = In(filters.address.in);
      }
    }

    return this.emailRepository.find({
      where,
      order: { address: 'asc' },
    });

  }

  @ResolveField(() => User, { name: 'user' })
  async getUser(@Parent() parent: UserEmail): Promise<User> {
    // TODO IMPLEMENTATION
    // Récupérer l'utilisateur à qui appartient l'email
    throw new NotImplementedException(); 
  }
}
