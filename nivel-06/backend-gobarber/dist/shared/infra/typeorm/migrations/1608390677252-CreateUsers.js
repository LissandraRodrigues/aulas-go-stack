"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsers1608390677252 {
  // Método de criação. O que será feito quando as migrations forem executadas.
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  } // Método para desfazer o que foi feito no método UP.


  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateUsers1608390677252;