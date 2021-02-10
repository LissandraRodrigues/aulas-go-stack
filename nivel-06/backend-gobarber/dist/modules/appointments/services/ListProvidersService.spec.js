"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeCacheProvider;
let listProvidersService;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProvidersService = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
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
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});