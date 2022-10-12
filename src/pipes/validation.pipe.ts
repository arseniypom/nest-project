import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((error) => {
        const constraints = Object.keys(error.constraints).map(
          (errorName) => error.constraints[errorName],
        );
        return `${error.property} – ${constraints.join(', ')}`;
      });
      throw new ValidationException(messages);
    }

    return value;
  }
}
