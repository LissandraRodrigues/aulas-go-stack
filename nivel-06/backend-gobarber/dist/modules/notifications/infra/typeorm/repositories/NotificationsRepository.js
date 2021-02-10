"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Notification = _interopRequireDefault(require("../schemas/Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NotificationsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getMongoRepository)(_Notification.default, 'mongo');
  }

  async create({
    recipient_id,
    content
  }) {
    const notification = this.ormRepository.create({
      recipient_id,
      content
    });
    await this.ormRepository.save(notification);
    return notification;
  }

}

var _default = NotificationsRepository;
exports.default = _default;