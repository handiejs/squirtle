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
  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }

  public render(): ReactNode {
    const DatePicker = getControl('DatePicker') as ComponentCtor;
    const { disableDate, showNow } = pick(this.config, [
      'disableDate',
      'showNow',
    ]) as Record<string, any>;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.getDateValue(), date, this.$$view.getValue());
    }

    return DatePicker ? (
      <DatePicker
        value={this.getDateValue()}
        placeholder={this.getPlaceholder()}
        disabled={this.state.disabled}
        format={this.getDisplayFormat()}
        pickerOption={options}
        onChange={(_, date) => this.onDateChange(date)}
      />
    ) : null;
  }
}
