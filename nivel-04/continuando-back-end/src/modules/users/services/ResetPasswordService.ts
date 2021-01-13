import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

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

        user.password = password;

        await this.usersRepository.save(user);

    }

}

export default ResetPasswordService;
