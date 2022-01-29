import { ReactNode } from 'react';

import { StringField } from '@handie/runtime-core/dist/types/input';
import {
  ComponentCtor,
  StringFieldWidgetState,
  isNumber,
  getControl,
} from 'handie-react';
import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { UrlStringFieldWidgetConfig } from '../typing';

export default class UrlEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  UrlStringFieldWidgetConfig
> {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      disabled: this.state.disabled,
      scheme: this.config.scheme || 'http',
      noAuthority: this.config.noAuthority,
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

    const UrlInput = getControl('UrlInput') as ComponentCtor;

    return UrlInput ? (
      <UrlInput {...props} onChange={(value) => this.onChange(value)} />
    ) : null;
  }
}
