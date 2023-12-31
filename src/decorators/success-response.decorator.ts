import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessResponse } from '../interceptors/transform-response.interceptor';

export const ApiSuccessResponseDec = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(SuccessResponse, model ? model : SuccessResponse),
    ApiOkResponse({
      description: 'Success operation',
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessResponse) },
          {
            properties: {
              data: model
                ? {
                    $ref: getSchemaPath(model),
                  }
                : undefined,
            },
          },
        ],
      },
    }),
  );
};
