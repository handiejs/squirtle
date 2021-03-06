import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { ComponentCtor, isNumber, getControl } from 'handie-react';
import { TextFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class InputTextFilterWidget extends TextFilterStructuralWidget {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
    };

    if (this.config.className) {
      props.className = this.config.className;
    }

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.props.filter as StringField;

      if (isNumber(min)) {
        props.minLength = min;
      }

      if (isNumber(max)) {
        props.maxLength = max;
      }
    }

    const TextInput = getControl('TextInput') as ComponentCtor;

    return TextInput ? (
      <TextInput {...props} onInput={(value) => this.onChange(value)} />
    ) : null;
  }
}
