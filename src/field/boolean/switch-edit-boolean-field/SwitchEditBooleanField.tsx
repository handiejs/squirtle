import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { BooleanFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class SwitchEditBooleanFieldWidget extends BooleanFieldStructuralWidget {
  public render(): ReactNode {
    const Switch = getControl('Switch') as ComponentCtor;

    return Switch ? (
      <Switch
        value={this.props.value}
        onChange={(value) => this.onChange(value)}
      />
    ) : null;
  }
}
