import { ReactNode } from 'react';

import { IntegerFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class NumberReadIntFieldWidget extends IntegerFieldHeadlessWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
