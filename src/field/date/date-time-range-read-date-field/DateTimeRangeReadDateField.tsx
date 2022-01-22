import { ReactNode } from 'react';

import { DateValue } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateTimeRangeReadDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public render(): ReactNode {
    return (
      <span>
        {(this.props.value || [])
          .map((v) => this.formatDate(v))
          .join(` ${this.getSeparator()} `)}
      </span>
    );
  }
}
