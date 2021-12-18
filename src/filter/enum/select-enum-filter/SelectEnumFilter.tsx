import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { EnumFilterHeadlessWidget } from 'handie-react/dist/widgets';

export default class SelectEditEnumFilterWidget extends EnumFilterHeadlessWidget {
  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    const children: ReactNode[] = this.state.options.map((opt) =>
      Option ? <Option label={opt.label} value={opt.value} /> : null,
    );

    const showEmptyValueOption = this.getCommonBehavior(
      'filter.showEmptyValueOption',
      false,
    );

    if (showEmptyValueOption && Option) {
      children.unshift(
        <Option
          label={this.getCommonBehavior('filter.emptyValueOptionLabel')}
          value=""
        />,
      );
    }

    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      clearable: !showEmptyValueOption,
    };

    if (this.config.className) {
      props.className = this.config.className;
    }

    return Select ? (
      <Select
        {...props}
        onChange={(value) => this.onChange(value == null ? '' : value)}
      >
        {children}
      </Select>
    ) : null;
  }
}
