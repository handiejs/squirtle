import { ReactNode } from 'react';

import {
  ComponentCtor,
  DateValue,
  isFunction,
  pick,
  getControl,
} from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(): ReactNode {
    const DatePicker = getControl('DatePicker') as ComponentCtor;
    const { disableDate, showNow } = pick(this.config, [
      'disableDate',
      'showNow',
    ]) as Record<string, any>;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.props.value, date, this.$$view.getValue());
    }

    return DatePicker ? (
      <DatePicker
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        disabled={this.state.disabled}
        format={this.config.format}
        pickerOption={options}
        onChange={(_, date) => this.onDateChange(date)}
      />
    ) : null;
  }
}