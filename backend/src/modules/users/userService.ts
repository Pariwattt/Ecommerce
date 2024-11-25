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
      // ตรวจสอบว่ามี username นี้อยู่ในระบบแล้วหรือไม่
      const checkUser = await userRepository.findByName(payload.username);
      if (checkUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Username already taken",  // ข้อความแสดงว่า username นี้ถูกใช้แล้ว
          null,
          StatusCodes.BAD_REQUEST   // ส่งสถานะ HTTP 400
        );
      }
  
      // ถ้าไม่มี username ซ้ำ ให้เรียก repository เพื่อสร้างผู้ใช้
      const user = await userRepository.create(payload);
  
      return new ServiceResponse(
        ResponseStatus.Success,
        "Create user success",  // ข้อความแจ้งว่าการสร้างสำเร็จ
        null,
        StatusCodes.OK          // ส่งสถานะ HTTP 200
      );
  
    } catch (ex) {
      const errorMessage = "Error create user : " + (ex as Error).message;
  
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,  // แสดงข้อผิดพลาดที่เกิดขึ้น
        null,
        StatusCodes.INTERNAL_SERVER_ERROR  // สถานะ HTTP 500
      );
    }
  },
  

  login: async (payload: TypePayloadUser, res: Response) => {
    try {
      // ตรวจสอบว่ามีผู้ใช้อยู่ในระบบหรือไม่
      const checkUser = await userRepository.findByName(payload.username);
      if (!checkUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "The Username or password is incorrect",  // ข้อมูลไม่ถูกต้อง
          null,
          StatusCodes.BAD_REQUEST
        );
      }
  
      // ตรวจสอบรหัสผ่าน
      const isValidPassword = await bcrypt.compare(payload.password, checkUser.password);
      if (!isValidPassword) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "The username or password is incorrect.",  // รหัสผ่านไม่ถูกต้อง
          null,
          StatusCodes.BAD_REQUEST
        );
      }
  
      // ข้อมูลถูกต้อง - สร้าง token
      const dataPayload = {
        uuid: checkUser.id,
        role: checkUser.role,
      };
      const token = await jwtGenerator.generate(dataPayload);
  
      // ส่ง token เป็นคุกกี้กลับไปยัง client
      res.cookie('token', token, {
        secure: process.env.NODE_ENV === 'production',  // ใช้ secure เฉพาะใน production
        sameSite: 'strict',
        maxAge: 3600000, // อายุ 1 ชั่วโมง
      });
  
      return new ServiceResponse(
        ResponseStatus.Success,
        "User authenticated successfully.",
        { token },  // ส่ง token กลับไปยัง client
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
      // ล้างคุกกี้ token
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
      });
  
      return new ServiceResponse(
        ResponseStatus.Success,
        "User logged out successfully.",  // ข้อความแจ้งว่าออกจากระบบสำเร็จ
        null,
        StatusCodes.OK
      );
  
    } catch (ex) {
      const errorMessage = "Error during logout: " + (ex as Error).message;
  
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,  // แสดงข้อผิดพลาดที่เกิดขึ้น
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  
}

