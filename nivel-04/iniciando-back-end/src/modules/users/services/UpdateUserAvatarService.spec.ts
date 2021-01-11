// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatar from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {

    it('should be able to create a new user', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        await updateUserAvatar.execute({

            user_id: user.id,
            avatarFilename: 'avatar.jpg'

        });

        expect(user.avatar).toBe('avatar.jpg');

    });

    it('should not be able to update avatar from non existing user', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

        expect(updateUserAvatar.execute({

            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg'

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should delete old avatar when updating new one', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        // O spy do jest literalmente "espiona" a função que passarmos como parâmetro.
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        await updateUserAvatar.execute({

            user_id: user.id,
            avatarFilename: 'avatar1.jpg'

        });

        await updateUserAvatar.execute({

            user_id: user.id,
            avatarFilename: 'avatar2.jpg'

        });

        expect(deleteFile).toHaveBeenCalledWith('avatar1.jpg');

        expect(user.avatar).toBe('avatar2.jpg');

    });

});


