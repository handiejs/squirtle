import { ReactNode } from 'react';

import { IntegerFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class NumberReadIntFieldWidget extends IntegerFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
