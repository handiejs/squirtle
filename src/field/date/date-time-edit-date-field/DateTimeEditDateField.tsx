import { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl, pick } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateTimeEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(): ReactNode {
    const DateTimePicker = getControl('DateTimePicker') as ComponentCtor;

    return DateTimePicker ? (
      <DateTimePicker
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        disabled={this.state.disabled}
        format={this.config.format}
        pickerOption={pick(this.config, ['disableDate', 'showNow'])}
        onChange={(_, date) => this.onDateChange(date)}
      />
    ) : null;
  }
}
