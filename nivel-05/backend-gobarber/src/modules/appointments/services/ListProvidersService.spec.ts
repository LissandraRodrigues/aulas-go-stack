import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;

let listProvidersService: ListProvidersService;

describe('ListProviders', () => {

    beforeEach(() => {

        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProvidersService = new ListProvidersService(fakeUsersRepository, fakeCacheProvider);

    });

    it('should be able to list the providers', async () => {

        const user1 = await fakeUsersRepository.create({

            name: "Luiza Lissandra",
            email: "luiza@teste.com",
            password: "123456"

        });

        const user2 = await fakeUsersRepository.create({

            name: "Elaine Veronica",
            email: "elaine@teste.com",
            password: "123456"

        });

        const loggedUser = await fakeUsersRepository.create({

            name: "Izaque Luiz",
            email: "izaque@teste.com",
            password: "123456"

        });

        const providers = await listProvidersService.execute({

            user_id: loggedUser.id,

        });

        expect(providers).toEqual([ user1, user2 ]);

    });

});


