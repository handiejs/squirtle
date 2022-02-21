import { ReactNode } from 'react';

import { ComponentCtor, isNumber, getControl } from 'handie-react';
import { MultiEnumFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SelectEditMultiEnumFilterWidget extends MultiEnumFilterStructuralWidget {
  private handleOptionChange(value: number[] | string[]): void {
    this.onChange(value);

    if (this.searchImmediately) {
      this.$$view.reload();
    }
  }

  public render(): ReactNode {
    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      multiple: true,
    };

    const { className, width } = this.config;

    if (className) {
      props.className = className;
    }

    if (width) {
      props.style = { width: isNumber(width) ? `${width}px` : width };
    }

    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    return Select ? (
      <Select {...props} onChange={this.handleOptionChange.bind(this)}>
        {this.state.options.map((opt) =>
          Option ? <Option label={opt.label} value={opt.value} /> : null,
        )}
      </Select>
    ) : null;
  }
}
