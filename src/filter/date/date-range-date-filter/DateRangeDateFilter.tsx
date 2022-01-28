import { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl, pick } from 'handie-react';
import { DateFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateRangeDateFilterWidget extends DateFilterStructuralWidget<
  DateValue[]
> {
  public render(): ReactNode {
    const DateRangePicker = getControl('DateRangePicker') as ComponentCtor;

    return DateRangePicker ? (
      <DateRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        format={this.config.format}
        separator={this.getSeparator()}
        pickerOption={pick(this.config, ['disableDate', 'showNow'])}
        onChange={(_, dates) => this.onRangeChange(dates)}
      />
    ) : null;
  }
}
