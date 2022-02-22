import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import {
  ComponentCtor,
  TextFieldWidgetState,
  isNumber,
  getControl,
} from 'handie-react';
import { TextFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { TextareaTextFieldWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

export default class TextareaEditTextFieldWidget extends TextFieldStructuralWidget<
  TextFieldWidgetState,
  TextareaTextFieldWidgetConfig
> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setBehaviors('field.textarea', defaultBehaviors);
  }

  public render(): ReactNode {
    let showWordLimit = this.config.showWordLimit;

    if (showWordLimit === undefined) {
      showWordLimit = this.getBehavior('showWordLimit');
    }

    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      rows: this.config.rows || this.getBehavior('rows'),
      resize: 'none',
      disabled: this.state.disabled,
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.props.field as StringField;

      if (isNumber(min)) {
        props.minLength = min;
      }

      if (isNumber(max)) {
        props.maxLength = max;
        props.showWordage = showWordLimit;
      }
    }

    const TextArea = getControl('TextArea') as ComponentCtor;

    return TextArea ? (
      <TextArea {...props} onInput={(value) => this.onChange(value)} />
    ) : null;
  }
}
