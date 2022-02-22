import { ReactNode } from 'react';

import {
  ComponentCtor,
  DateValue,
  isFunction,
  pick,
  getControl,
} from 'handie-react';
import { DateFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateTimeRangeDateFilterWidget extends DateFilterStructuralWidget<
  DateValue[]
> {
  private handleRangeChange(_, dates: (Date | null)[] | null): void {
    this.onRangeChange(dates);

    if (this.searchImmediately) {
      this.$$view.reload();
    }
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('filter.dateTimeFormat'));
  }

  public render(): ReactNode {
    const DateTimeRangePicker = getControl(
      'DateTimeRangePicker',
    ) as ComponentCtor;
    const { disableDate, showNow } = pick(this.config, [
      'disableDate',
      'showNow',
    ]) as Record<string, any>;
    const options: Record<string, any> = { showNow };

    if (isFunction(disableDate)) {
      options.disableDate = (date: Date) =>
        disableDate(this.getRangeValue(), date, this.$$view.getValue());
    }

    return DateTimeRangePicker ? (
      <DateTimeRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        format={this.getDisplayFormat()}
        separator={this.getSeparator()}
        pickerOption={options}
        onChange={this.handleRangeChange.bind(this)}
      />
    ) : null;
  }
}
