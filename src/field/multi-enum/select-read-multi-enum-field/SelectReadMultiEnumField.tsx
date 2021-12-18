import { ReactNode } from 'react';
import { MultiEnumFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class SelectReadMultiEnumFieldWidget extends MultiEnumFieldHeadlessWidget {
  public render(): ReactNode {
    return <span>{this.displayText}</span>;
  }
}
