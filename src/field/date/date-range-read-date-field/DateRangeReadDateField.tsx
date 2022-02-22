import { ReactNode } from 'react';

import { DateValue } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateRangeReadDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }

  public render(): ReactNode {
    return <span>{this.getRangeValue().join(` ${this.getSeparator()} `)}</span>;
  }
}
