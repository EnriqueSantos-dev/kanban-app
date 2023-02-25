import { createParamDecorator } from '@nestjs/common';

export const GetUserProperties = createParamDecorator(
  (data: string | undefined, req) => {
    const request = req.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user?.[data] : user;
  }
);
