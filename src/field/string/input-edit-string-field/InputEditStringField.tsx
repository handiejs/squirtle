import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import {
  ComponentCtor,
  StringFieldWidgetState,
  isNumber,
  getControl,
} from 'handie-react';
import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { InputStringFieldWidgetConfig } from './typing';

export default class InputEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  InputStringFieldWidgetConfig
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
      const { min, max } = this.props.field as StringField;

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
