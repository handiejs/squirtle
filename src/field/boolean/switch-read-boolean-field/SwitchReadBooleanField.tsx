import { ReactNode } from 'react';

import { BooleanFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class SwitchReadBooleanFieldWidget extends BooleanFieldHeadlessWidget {
  public render(): ReactNode {
    return (
      <span>{this.props.value ? this.positiveLabel : this.negativeLabel}</span>
    );
  }
}