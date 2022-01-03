import { ReactNode } from 'react';

import { StringFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class InputReadStringFieldWidget extends StringFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
