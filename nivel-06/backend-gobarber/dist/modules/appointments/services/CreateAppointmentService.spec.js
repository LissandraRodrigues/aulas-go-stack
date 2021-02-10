"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationsRepository"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'reflect-metadata';
let fakeAppointmentRepository;
let fakeNotificationsRepository;
let createAppointment;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationsRepository = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentService.default(fakeAppointmentRepository, fakeNotificationsRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2021, 0, 10, 13),
      user_id: "user_id",
      provider_id: "provider-id"
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });
  it('should not to be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 5, 8, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: "user-id",
      provider_id: "provider-id"
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: "user-id",
      provider_id: "provider-id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 11, 15, 12),
      user_id: "user_id",
      provider_id: "provider_id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 11, 15, 13),
      user_id: "user_id",
      provider_id: "user_id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2021, 0, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 11, 11, 7),
      user_id: "user_id",
      provider_id: "provider_id"
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 11, 11, 18),
      user_id: "user_id",
      provider_id: "provider_id"
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});