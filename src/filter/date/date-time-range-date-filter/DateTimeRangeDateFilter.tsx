import { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl, pick } from 'handie-react';
import { DateFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateTimeRangeDateFilterWidget extends DateFilterStructuralWidget<
  DateValue[]
> {
  public render(): ReactNode {
    const DateTimeRangePicker = getControl(
      'DateTimeRangePicker',
    ) as ComponentCtor;

    return DateTimeRangePicker ? (
      <DateTimeRangePicker
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
