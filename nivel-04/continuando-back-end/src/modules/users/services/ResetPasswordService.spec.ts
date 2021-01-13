// import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
//import AppError from '@shared/errors/AppError';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;

let resetPassword: ResetPasswordService;

describe('ResestPasswordService', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokensRepository = new FakeUsersTokensRepository();

        resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUsersTokensRepository);

    });

    it('should be able to to reset the password', async () => {

        const user = await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        const { token } = await fakeUsersTokensRepository.generate(user.id);

        await resetPassword.execute({

            password: "123123",
            token,

        });

        const updateUser = await fakeUsersRepository.findById(user.id)

        expect(updateUser?.password).toBe('123123');

    });

});


