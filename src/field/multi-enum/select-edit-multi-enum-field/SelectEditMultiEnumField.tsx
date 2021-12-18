import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { MultiEnumFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class SelectEditMultiEnumFieldWidget extends MultiEnumFieldHeadlessWidget {
  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    return Select ? (
      <Select
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        multiple={true}
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
