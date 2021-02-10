"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'reflect-metadata';
let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: "Luiza Lissandra",
      email: "luiza@teste.com",
      password: "123456"
    });
    await sendForgotPasswordEmail.execute({
      email: "luiza@teste.com"
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: "luiza@teste.com"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forget password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: "Luiza Lissandra",
      email: "luiza@teste.com",
      password: "123456"
    });
    await sendForgotPasswordEmail.execute({
      email: "luiza@teste.com"
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});