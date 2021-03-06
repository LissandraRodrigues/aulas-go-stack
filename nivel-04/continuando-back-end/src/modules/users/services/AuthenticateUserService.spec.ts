// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';

import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

    beforeEach(() => {

        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    });

    it('should be able to authenticate', async () => {

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

        await expect(authenticateUser.execute({

            email: "luiza@teste.com",
            password: "123456"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to authenticate with wrong password', async () => {

        await createUser.execute({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        await expect(authenticateUser.execute({

            email: "luiza@teste.com",
            password: "111111"

        })).rejects.toBeInstanceOf(AppError);

    });

});


