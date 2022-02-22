import { ReactNode } from 'react';

import { DateValue } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateTimeRangeReadDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }

  public render(): ReactNode {
    return <span>{this.getRangeValue().join(` ${this.getSeparator()} `)}</span>;
  }
}
