// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatar from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

let updateUserAvatar: UpdateUserAvatar;

describe('UpdateUserAvatar', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    })

    it('should be able to create a new user', async () => {

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

        await expect(updateUserAvatar.execute({

            user_id: 'non-existing-user',
            avatarFilename: 'avatar.jpg'

        })).rejects.toBeInstanceOf(AppError);

    });

    it('should delete old avatar when updating new one', async () => {

        // O spy do jest literalmente "espiona" a função que passarmos como parâmetro.
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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


