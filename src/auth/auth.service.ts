import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
/**
 * AuthService provides authentication-related functionalities,
 * including user validation, login, and registration. It leverages the JwtService
 * for JWT token generation and management, and bcrypt for password encryption
 * and verification.
 */
export class AuthService {
  constructor(
    private usersService: UsersService, // Injects the UsersService for accessing user data.
    private jwtService: JwtService // Injects the JwtService for JWT operations.
  ) {}

  /**
   * Validates a user's login credentials against stored credentials.
   * 
   * @param loginUserDto Contains user login information, including email and password.
   * @returns The user object without the password if validation is successful, otherwise null.
   */
  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findOne(email); // Retrieves user by email.
    if (user && await bcrypt.compare(password, user.password)) { // Compares hashed passwords.
      const { password, ...result } = user;
      return result; // Returns user data excluding the password.
    }
    return null; // Returns null if user not found or password doesn't match.
  }

  /**
   * Handles user login, generating a JWT token upon successful authentication.
   * 
   * @param loginUserDto DTO containing user login credentials.
   * @returns An object containing the JWT access token.
   */
  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto); // Validates user credentials.
    if (!user) {
      throw new Error('Invalid credentials'); // Throws an error if validation fails.
    }
    const payload = { email: user.email, sub: user.id, role: user.role }; // Prepares JWT payload.
    return {
      access_token: this.jwtService.sign(payload), // Signs and returns the JWT.
    };
  }

  /**
   * Registers a new user in the system.
   * 
   * @param createUserDto Contains new user registration data.
   * @returns The created user object without the password field.
   */
  async register(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto); // Creates a new user.
    const { password, ...result } = newUser;
    return result; // Returns new user data excluding the password.
  }
}

