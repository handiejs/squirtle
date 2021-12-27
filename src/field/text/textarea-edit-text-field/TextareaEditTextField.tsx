import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import { ComponentCtor, isNumber, getControl } from 'handie-react';
import { TextFieldHeadlessWidget } from 'handie-react/dist/widgets';

import defaultBehaviors from './behavior';

export default class TextareaEditTextFieldWidget extends TextFieldHeadlessWidget {
  constructor(props) {
    super(props);
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
    };

    if (this.showValidationRulesAsNative) {
      const { min, max } = this.props.field as StringField;

      if (isNumber(min)) {
        props.minLength = min;
      }

      if (isNumber(max)) {
        props.maxLength = max;
        props.wordage = showWordLimit;
      }
    }

    const TextArea = getControl('TextArea') as ComponentCtor;

    return TextArea ? (
      <TextArea {...props} onInput={(value) => this.onChange(value)} />
    ) : null;
  }
}
