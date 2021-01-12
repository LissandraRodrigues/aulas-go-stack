// import 'reflect-metadata';
//import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {

    it('should be able to recover the password using the email', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const SendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

        await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"
        });

        await SendForgotPasswordEmail.execute({

            email: "luiza@teste.com",

        });

        expect(sendMail).toHaveBeenCalled();

    });

});


