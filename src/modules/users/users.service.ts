import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from 'src/common/utils/crypto';
import { Repository } from 'typeorm';
import { CreateUser } from './create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.usersRepo.findOne({ username });
  }

  async findOneByUsernameWithPassword(username: string): Promise<UserEntity> {
    return await this.usersRepo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .addSelect('user.salt')
      .where('user.username = :username', { username })
      .getOne();
  }

  async insertUser(user: CreateUser) {
    const { password } = user;
    const { salt, hash } = await Crypto.hashPassword(password);

    const newUser = this.usersRepo.create({ ...user, password: hash, salt });
    await this.usersRepo.save(newUser);
    return newUser;
  }
}
