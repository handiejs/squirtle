import { ReactNode } from 'react';

import { NumberField } from '@handie/runtime-core/dist/types/input';
import { ComponentCtor, isNumber, isNumeric, getControl } from 'handie-react';
import { IntegerFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class NumberEditIntegerFieldWidget extends IntegerFieldStructuralWidget {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.props.field as NumberField;

      if (isNumber(min)) {
        props.min = min;
      }

      if (isNumber(max)) {
        props.max = max;
      }
    }

    const NumberInput = getControl('NumberInput') as ComponentCtor;

    return NumberInput ? (
      <NumberInput
        {...props}
        onChange={(value) =>
          this.onChange(isNumeric(value) ? parseFloat(value) : value)
        }
      />
    ) : null;
  }
}
