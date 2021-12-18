import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { ComponentCtor, isNumber, getControl } from 'handie-react';
import { StringFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class InputEditStringFieldWidget extends StringFieldHeadlessWidget {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
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
      <TextInput {...props} onInput={this.props.onChange} />
    ) : null;
  }
}
