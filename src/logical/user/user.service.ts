import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

interface PromiseResponse<T = unknown> {
  code: number;
  data?: T;
  msg: string;
}

interface BodyRequest {
  username: string;
}

@Injectable()
export class UserService {
  async findOne(body: BodyRequest): Promise<PromiseResponse> {
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${body.username}'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
      });
      const user = res[0];
      if (user) {
        return {
          code: 200, // 返回状态码，可自定义
          data: {
            user,
          },
          msg: 'Success',
        };
      } else {
        return {
          code: 400, // 返回状态码，可自定义
          data: null,
          msg: 'fail',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
