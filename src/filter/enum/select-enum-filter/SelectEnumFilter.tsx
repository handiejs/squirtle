import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { EnumFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SelectEditEnumFilterWidget extends EnumFilterStructuralWidget {
  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    const children: ReactNode[] = this.state.options.map((opt) =>
      Option ? (
        <Option
          label={opt.label}
          value={opt.value}
          key={`Option${opt.value}OfSelectEditEnumFilterWidget`}
        />
      ) : null,
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
          key="OptionAllOfSelectEditEnumFilterWidget"
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
