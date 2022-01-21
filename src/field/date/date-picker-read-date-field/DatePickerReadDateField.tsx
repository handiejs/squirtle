import { ReactNode } from 'react';

import { DateValue } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DatePickerReadDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(): ReactNode {
    return <span>{this.formatDate(this.props.value)}</span>;
  }
}
