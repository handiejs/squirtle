import { ReactNode } from 'react';

import {
  ComponentCtor,
  DateValue,
  isFunction,
  pick,
  getControl,
} from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateRangeEditDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }

  public render(): ReactNode {
    const DateRangePicker = getControl('DateRangePicker') as ComponentCtor;
    const { disableDate, showNow } = pick(this.config, [
      'disableDate',
      'showNow',
    ]) as Record<string, any>;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.getRangeValue(), date, this.$$view.getValue());
    }

    return DateRangePicker ? (
      <DateRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        disabled={this.state.disabled}
        format={this.getDisplayFormat()}
        separator={this.getSeparator()}
        pickerOption={options}
        onChange={(_, dates) => this.onRangeChange(dates)}
      />
    ) : null;
  }
}
