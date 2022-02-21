import { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl, pick } from 'handie-react';
import { DateFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateRangeDateFilterWidget extends DateFilterStructuralWidget<
  DateValue[]
> {
  private handleRangeChange(_, dates: (Date | null)[] | null): void {
    this.onRangeChange(dates);

    if (this.searchImmediately) {
      this.$$view.reload();
    }
  }

  public render(): ReactNode {
    const DateRangePicker = getControl('DateRangePicker') as ComponentCtor;

    return DateRangePicker ? (
      <DateRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        format={this.config.format}
        separator={this.getSeparator()}
        pickerOption={pick(this.config, ['disableDate', 'showNow'])}
        onChange={this.handleRangeChange.bind(this)}
      />
    ) : null;
  }
}
