import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessResponse } from '../interceptors/transform-response.interceptor';
import { PaginatedResponse } from '../lib/pagination/paginator.lib';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(
      SuccessResponse,
      PaginatedResponse,
      model ? model : SuccessResponse,
    ),
    ApiOkResponse({
      description: 'Success operation',
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(SuccessResponse),
            properties: {
              data: {
                $ref: getSchemaPath(PaginatedResponse),
                properties: {
                  results: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
