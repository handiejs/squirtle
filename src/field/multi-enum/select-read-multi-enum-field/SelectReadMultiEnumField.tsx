import { ReactNode } from 'react';
import { MultiEnumFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class SelectReadMultiEnumFieldWidget extends MultiEnumFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.displayText}</span>;
  }
}
