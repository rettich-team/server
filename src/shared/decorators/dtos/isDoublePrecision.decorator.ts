import { 
    registerDecorator,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
class IsDoublePrecisionConstraint implements ValidatorConstraintInterface {
    public validate(value: any): boolean {
        if (typeof value === 'number') {
            if (value % 1 === 0) {
                return true;
            }

            const valueText: string = value.toString();
            const valueSegments: string[] = valueText.split('.');
            const decimalDigits: string = valueSegments[1];

            return decimalDigits.length <= 15;
        }
        
        return false;
    }

    public defaultMessage(args: ValidationArguments): string {
        return `${args.property} must have less than or equal to 15 decimal digits.`;
    }
}

export function IsDoublePrecision() {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            validator: IsDoublePrecisionConstraint,
        });
    };
}