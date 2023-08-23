import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiCreatedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponse } from '../interceptors/transform-response.interceptor';

export const ApiCreatedResponseDec = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(SuccessResponse, model),
    ApiCreatedResponse({
      description: 'Success operation',
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(SuccessResponse),
          },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
