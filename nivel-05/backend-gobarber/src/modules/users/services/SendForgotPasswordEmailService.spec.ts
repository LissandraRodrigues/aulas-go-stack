// import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);

    });

    it('should be able to recover the password using the email', async () => {

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        await sendForgotPasswordEmail.execute({

            email: "luiza@teste.com",

        });

        expect(sendMail).toHaveBeenCalled();

    });

    it('should not be able to recover a non-existing user password', async () => {

        await expect(sendForgotPasswordEmail.execute({

            email: "luiza@teste.com",

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should generate a forget password token', async () => {

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        await sendForgotPasswordEmail.execute({

            email: "luiza@teste.com",

        });

        expect(generateToken).toHaveBeenCalledWith(user.id);

    });

});


