import { ReactNode } from 'react';

import { EnumFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class RadioReadEnumFieldWidget extends EnumFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.displayText}</span>;
  }
}
