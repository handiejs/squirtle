import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { MultiEnumFilterHeadlessWidget } from 'handie-react/dist/widgets';

export default class SelectEditMultiEnumFilterWidget extends MultiEnumFilterHeadlessWidget {
  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      multiple: true,
    };

    if (this.config.className) {
      props.className = this.config.className;
    }

    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    return Select ? (
      <Select {...props} onChange={this.onChange}>
        {this.state.options.map((opt) =>
          Option ? <Option label={opt.label} value={opt.value} /> : null,
        )}
      </Select>
    ) : null;
  }
}
