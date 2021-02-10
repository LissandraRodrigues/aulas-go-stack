"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderAppointmentsService = _interopRequireDefault(require("./ListProviderAppointmentsService"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 'reflect-metadata';
let fakeAppointmentsRepository;
let listProviderAppointmentsService;
let fakeCacheProvider;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointmentsService = new _ListProviderAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: "user",
      date: new Date(2021, 4, 21, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: "user",
      date: new Date(2021, 4, 21, 15, 0, 0)
    });
    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2021,
      month: 5,
      day: 21
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});