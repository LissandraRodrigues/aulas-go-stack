// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {

    it('should be able to authenticate', async () => {

        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUser.execute({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        const response = await authenticateUser.execute({

            email: "luiza@teste.com",
            password: "123456"

        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);

    });

    it('should not be able to authenticate with non existing user', async () => {

        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        expect(authenticateUser.execute({

            email: "luiza@teste.com",
            password: "123456"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {

        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

        await createUser.execute({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        expect(authenticateUser.execute({

            email: "luiza@teste.com",
            password: "111111"

        })).rejects.toBeInstanceOf(AppError);

    });

});


