// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();

        showProfileService = new ShowProfileService(fakeUsersRepository);

    });

    it('should be able to show the profile', async () => {

        const user = await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        const profile = await showProfileService.execute({ user_id: user.id });

        expect(profile.name).toBe("Elaine Veronica");
        expect(profile.email).toBe("elaine@teste.com");

    });

    it('should not be able to show the profile from non-existing user', async () => {

        await expect(showProfileService.execute({ user_id: "non-existing-user-id" })).rejects.toBeInstanceOf(AppError);

    });

});


