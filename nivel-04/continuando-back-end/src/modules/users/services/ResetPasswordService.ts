import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import { isAfter, addHours } from 'date-fns';

interface IRequest {

    password: string;
    token: string;

}

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private userTokensRepository: IUsersTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken) {

            throw new AppError('User token does not exists.')

        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user) {

            throw new AppError('User does not exists. ')

        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {

            throw new AppError('Token expired');

        };

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);

    }

}

export default ResetPasswordService;
