import { ReactNode } from 'react';

import { EnumFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class SelectReadEnumFieldWidget extends EnumFieldHeadlessWidget {
  public render(): ReactNode {
    return <span>{this.displayText}</span>;
  }
}
