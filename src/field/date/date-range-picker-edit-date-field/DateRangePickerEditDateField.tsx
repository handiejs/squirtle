import { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl, pick } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist//widgets/class';

export default class DateRangePickerEditDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public render(): ReactNode {
    const DateRangePicker = getControl('DateRangePicker') as ComponentCtor;

    return DateRangePicker ? (
      <DateRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        disabled={this.state.disabled}
        format={this.config.format}
        separator={this.getSeparator()}
        pickerOption={pick(this.config, ['disableDate', 'showToday'])}
        onChange={(_, dates) => this.onRangeChange(dates)}
      />
    ) : null;
  }
}
