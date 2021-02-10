"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 'reflect-metadata';
let fakeAppointmentsRepository;
let listProviderDayAvailabilityService;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvailabilityService = new _ListProviderDayAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: "user",
      date: new Date(2021, 4, 21, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: "user",
      date: new Date(2021, 4, 21, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 21, 11).getTime();
    });
    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 5,
      day: 21
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 14,
      available: false
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});