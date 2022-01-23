import { ReactNode } from 'react';

import { NumberField } from '@handie/runtime-core/dist/types/input';
import {
  ComponentCtor,
  IntegerFieldWidgetState,
  isNumber,
  isNumeric,
  getControl,
} from 'handie-react';
import { IntegerFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { NumberIntegerFieldWidgetConfig } from './typing';

export default class NumberEditIntegerFieldWidget extends IntegerFieldStructuralWidget<
  IntegerFieldWidgetState,
  NumberIntegerFieldWidgetConfig
> {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      disabled: this.state.disabled,
      prefix: this.config.prefix,
      suffix: this.config.suffix,
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
