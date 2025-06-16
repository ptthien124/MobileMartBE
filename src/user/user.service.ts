import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  private readonly saltRounds = 10;

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }

  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user) {
      // Use the compare method from UserService (or PasswordService)
      const isPasswordMatching = await this.comparePassword(
        // const isPasswordMatching = await this.passwordService.compare( // If using PasswordService
        pass,
        user.password
      );

      if (isPasswordMatching) {
        // IMPORTANT: Don't return the password_hash or sensitive info
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result; // User object without the hash
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signIn(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.validateUser(username, pass);

    return user;
    // return {
    //   access_token: await this.jwtService.signAsync(payload)
    // };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, storedPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  async signUp(createUserDto: SignUpDto) {
    const { username, password, ...otherData } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { username } });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    return this.usersRepository.save({
      username,
      password: hashedPassword,
      ...otherData
    });
  }
}
