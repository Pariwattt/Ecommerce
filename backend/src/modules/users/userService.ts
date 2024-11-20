import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { userRepository } from "@modules/users/userRepository";
import { TypePayloadUser } from "@modules/users/userModel";

import bcrypt from "bcrypt";
import { jwtGenerator } from "@common/utils/jwtGenerator"

export const userService = {
  create: async (payload: TypePayloadUser) => {
    try {
      const checkUser = await userRepository.findByName(payload.username);
      if (checkUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Username already taken",
          null,
          StatusCodes.BAD_REQUEST

        )
      }
      const user = await userRepository.create(payload);
      return new ServiceResponse(
        ResponseStatus.Success,
        "Create user success",
        null,
        StatusCodes.OK
      )


    } catch (ex) {
      const errorMessage = "Error create user : " + (ex as Error).message;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR

      )

    }
  },

  login: async (payload: TypePayloadUser, res: Response) => {
    try {
      // เช็คว่ามีผู้ใช้ในฐานข้อมูลหรือไม่
      const checkUser = await userRepository.findByName(payload.username);
      if (!checkUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "The Username or password is incorrect",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      // ตรวจสอบรหัสผ่าน
      const password = payload.password;
      const passwordDB = checkUser.password;
      const isValidPassword = await bcrypt.compare(password, passwordDB);
      if (!isValidPassword) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "The username or password is incorrect.",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      // ถ้าผ่านการตรวจสอบรหัสผ่าน ให้สร้าง Token
      const uuid = checkUser.id;
      const role = checkUser.role;
      const dataPayload = {
        uuid: uuid,
        role: role
      };
      const token = await jwtGenerator.generate(dataPayload);

      // ส่งคุกกี้ที่มี token ไปให้ client
      res.cookie('token', token, {
        secure: process.env.NODE_ENV === 'production',  // ใช้ secure ถ้าอยู่ในโหมด production
        sameSite: 'strict',  // หรือ 'Lax' ขึ้นอยู่กับสถานการณ์
        maxAge: 3600000  // อายุคุกกี้ (1 ชั่วโมง)
      });

      // ส่ง response กลับไปพร้อม token
      return new ServiceResponse(
        ResponseStatus.Success,
        "User authenticated successfully.",
        { token }, // ส่ง token กลับไป
        StatusCodes.OK
      );

    } catch (ex) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Error during login: " + (ex as Error).message,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

  },
  logout: (res: Response) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
      });
      return new ServiceResponse(
        ResponseStatus.Success,
        "User logged out successfully.",
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = "Error during logout: " + (ex as Error).message;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
}

