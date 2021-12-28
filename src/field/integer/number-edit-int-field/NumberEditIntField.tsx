import { ReactNode } from 'react';

import { NumberField } from '@handie/runtime-core/dist/types/input';
import { ComponentCtor, isNumber, getControl } from 'handie-react';
import { IntegerFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class NumberEditIntFieldWidget extends IntegerFieldHeadlessWidget {
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
        onInput={(value) => this.onChange(parseFloat(value))}
      />
    ) : null;
  }
}
