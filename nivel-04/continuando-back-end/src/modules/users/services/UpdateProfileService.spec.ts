// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);

    })

    it('should be able to update the profile', async () => {

        const user = await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        const updateUser = await updateProfileService.execute({

            user_id: user.id,

            name: "Elaine Rosa",
            email: "elainerosa@teste.com",

        });

        expect(updateUser.name).toBe("Elaine Rosa");
        expect(updateUser.email).toBe("elainerosa@teste.com");

    });

    it('should not be able to update the profile from non-existing user', async () => {

        await expect(updateProfileService.execute({
            user_id: "non-existing-user-id",
            name: "Test",
            email: "teste@gmail.com"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to change to another email already used', async () => {

        await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        const user = await fakeUsersRepository.create({

            name: "Luiza Rosa",
            email: "luiza@teste.com",
            password: "123456"

        });

        await expect(updateProfileService.execute({

            user_id: user.id,

            name: "Luiza Lissandra",
            email: "elaine@teste.com",

        })).rejects.toBeInstanceOf(AppError);

    });


    it('should be able to update the password', async () => {

        const user = await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        const updateUser = await updateProfileService.execute({

            user_id: user.id,

            name: "Elaine Rosa",
            email: "elaine@teste.com",
            old_password: "123456",
            password: "123123"

        });

        expect(updateUser.password).toBe("123123");

    });

    it('should not be able to update the password without old password', async () => {

        const user = await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        await expect(updateProfileService.execute({

            user_id: user.id,

            name: "Elaine Rosa",
            email: "elaine@teste.com",
            password: "123123"

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should not be able to update the password with wrong old password', async () => {

        const user = await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        await expect(updateProfileService.execute({

            user_id: user.id,

            name: "Elaine Rosa",
            email: "elaine@teste.com",
            old_password: "wrong-password",
            password: "123123"

        })).rejects.toBeInstanceOf(AppError);

    });

});


