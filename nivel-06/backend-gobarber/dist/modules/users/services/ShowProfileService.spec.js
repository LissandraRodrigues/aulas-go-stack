"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'reflect-metadata';
let fakeUsersRepository;
let showProfileService;
describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    showProfileService = new _ShowProfileService.default(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: "Elaine Veronica",
      email: "elaine@teste.com",
      password: "123456"
    });
    const profile = await showProfileService.execute({
      user_id: user.id
    });
    expect(profile.name).toBe("Elaine Veronica");
    expect(profile.email).toBe("elaine@teste.com");
  });
  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfileService.execute({
      user_id: "non-existing-user-id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});