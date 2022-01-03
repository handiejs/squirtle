import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { MultiEnumFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class SelectEditMultiEnumFieldWidget extends MultiEnumFieldStructuralWidget {
  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    return Select ? (
      <Select
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        multiple={true}
        onChange={(value) => this.onChange(value)}
      >
        {this.state.options.map((opt) =>
          Option ? (
            <Option
              key={`Option${opt.value}OfSelectEditMultiEnumFieldWidget`}
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
