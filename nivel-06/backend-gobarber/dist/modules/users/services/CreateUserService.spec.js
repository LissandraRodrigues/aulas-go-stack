"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'reflect-metadata';
let fakeUsersRepository;
let fakeHashProvider;
let fakeCacheProvider;
let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: "Luiza Lissandra",
      email: "luiza@teste.com",
      password: "123456"
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: "Luiza Lissandra",
      email: "luiza@teste.com",
      password: "123456"
    });
    await expect(createUser.execute({
      name: "Luiza Lissandra",
      email: "luiza@teste.com",
      password: "123456"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});