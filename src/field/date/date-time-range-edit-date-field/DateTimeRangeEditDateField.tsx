import { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl, pick } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateTimeRangeEditDateFieldWidget extends DateFieldStructuralWidget<
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
        disabled={this.state.disabled}
        format={this.config.format}
        separator={this.getSeparator()}
        pickerOption={pick(this.config, ['disableDate', 'showNow'])}
        onChange={(_, dates) => this.onRangeChange(dates)}
      />
    ) : null;
  }
}
