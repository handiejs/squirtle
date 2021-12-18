import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { BooleanFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class SwitchEditBooleanFieldWidget extends BooleanFieldHeadlessWidget {
  public render(): ReactNode {
    const Switch = getControl('Switch') as ComponentCtor;

    return Switch ? (
      <Switch value={this.props.value} onChange={this.onChange} />
    ) : null;
  }
}
