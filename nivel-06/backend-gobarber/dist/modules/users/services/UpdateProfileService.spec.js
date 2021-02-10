"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'reflect-metadata';
let fakeUsersRepository;
let fakeHashProvider;
let updateProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfileService = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: "Elaine Veronica",
      email: "elaine@teste.com",
      password: "123456"
    });
    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: "Elaine Rosa",
      email: "elainerosa@teste.com"
    });
    expect(updateUser.name).toBe("Elaine Rosa");
    expect(updateUser.email).toBe("elainerosa@teste.com");
  });
  it('should not be able to update the profile from non-existing user', async () => {
    await expect(updateProfileService.execute({
      user_id: "non-existing-user-id",
      name: "Test",
      email: "teste@gmail.com"
    })).rejects.toBeInstanceOf(_AppError.default);
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
      email: "elaine@teste.com"
    })).rejects.toBeInstanceOf(_AppError.default);
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
    })).rejects.toBeInstanceOf(_AppError.default);
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
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});