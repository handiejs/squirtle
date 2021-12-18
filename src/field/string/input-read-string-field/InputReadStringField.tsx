import { ReactNode } from 'react';

import { StringFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class InputReadStringFieldWidget extends StringFieldHeadlessWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
