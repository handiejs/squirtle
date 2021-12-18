import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { EnumFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class SelectEditEnumFieldWidget extends EnumFieldHeadlessWidget {
  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    return Select ? (
      <Select
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        clearable={!this.props.field.required}
        onChange={this.onChange}
      >
        {this.state.options.map((opt) =>
          Option ? (
            <Option
              label={opt.label}
              value={opt.value}
              disabled={opt.disabled}
            />
          ) : null,
        )}
      </Select>
    ) : null;
  }
}
