// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('CreateUser', () => {

    it('should be able to create a new user', async () => {

        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

        const user = await createUser.execute({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        expect(user).toHaveProperty('id');

    })

    it('should not be able to create a new user with same email from another', async () => {

        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

        await createUser.execute({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        expect(createUser.execute({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        })).rejects.toBeInstanceOf(AppError);

    })

});


