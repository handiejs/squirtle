import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { ComponentCtor, isNumber, getControl } from 'handie-react';
import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class PasswordEditStringFieldWidget extends StringFieldStructuralWidget {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      disabled: this.state.disabled,
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

    const Password = getControl('Password') as ComponentCtor;

    return Password ? (
      <Password {...props} onInput={(value) => this.onChange(value)} />
    ) : null;
  }
}
