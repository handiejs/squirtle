import { ReactNode } from 'react';

import {
  ComponentCtor,
  FilterDescriptor,
  isBoolean,
  isNumber,
  isNumeric,
  getControl,
  getRenderer,
} from 'handie-react';
import { SearchHeadlessWidget } from 'handie-react/dist/widgets';

import defaultBehaviors from './behavior';

export default class FormSearchWidget extends SearchHeadlessWidget {
  private resolveLabelWidth(): string {
    const labelWidth =
      this.config.formControlLabelWidth ||
      this.getBehavior('formControlLabelWidth');

    return isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
  }

  private resolveSearchable(): boolean {
    return isBoolean(this.config.searchable)
      ? this.config.searchable
      : this.getBehavior('searchable') !== false;
  }

  private resolveResettable(): boolean {
    return isBoolean(this.config.resettable)
      ? this.config.resettable
      : this.getBehavior('resettable') === true;
  }

  private handleSearch(evt: any): void {
    this.submit();

    if (evt) {
      evt.preventDefault();
    }
  }

  private handleReset(evt: any): void {
    this.reset();

    if (evt) {
      evt.preventDefault();
    }
  }

  private renderFilter(filter: FilterDescriptor): ReactNode {
    const FormField = getControl('FormField') as ComponentCtor;
    const FilterRenderer = getRenderer('FilterRenderer') as ComponentCtor;

    return FormField ? (
      <FormField label={filter.label}>
        {FilterRenderer ? (
          <FilterRenderer
            filter={filter}
            value={this.condition[filter.name]}
            onChange={this.setFilterValue}
          />
        ) : null}
      </FormField>
    ) : null;
  }

  private renderFilterRow(filters: FilterDescriptor[]): ReactNode {
    return (
      <div className="FormSearch-filterRow">
        {filters.map((filter) => this.renderFilter(filter))}
      </div>
    );
  }

  private renderFilters(): ReactNode[] {
    const filterNodes: ReactNode[] = [];
    const rows = (this.config.arrangement || '').split('|') as any[];

    let needLayout = false;

    if (rows.length > 0) {
      const availableRows: number[] = [];

      rows.forEach((row) => {
        if (isNumeric(row) && Number(row) > 0) {
          availableRows.push(row);
        }
      });

      needLayout = availableRows.length === rows.length;
    }

    if (needLayout) {
      const remainedFilters = this.filters.filter(
        ({ hidden }) => hidden !== true,
      );

      do {
        filterNodes.push(
          this.renderFilterRow(remainedFilters.splice(0, rows.shift() * 1)),
        );
      } while (remainedFilters.length > 0 && rows.length > 0);

      if (remainedFilters.length > 0) {
        filterNodes.push(this.renderFilterRow(remainedFilters));
      }
    } else {
      this.filters.forEach((filter) => {
        if (!filter.hidden) {
          filterNodes.push(this.renderFilter(filter));
        }
      });
    }

    return filterNodes;
  }

  constructor(props: Record<string, any>) {
    super(props);
    this.setBehaviors('search.form', defaultBehaviors);
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.initCondition();
  }

  public render(): ReactNode {
    const formControlSize = this.getBehavior('formControlSize');
    const formChildren: ReactNode[] = this.renderFilters();
    const standalone = this.getBehavior('actionsStandalone') === true;
    const searchable = this.resolveSearchable();
    const buttonProps: Record<string, any> = {
      className: 'FormSearch-button',
      size: formControlSize,
      nativeType: standalone ? 'button' : 'submit',
    };

    if (this.getBehavior('submitButtonAsPrimary') === true) {
      buttonProps.color = 'primary';
    }

    const buttons: ReactNode[] = [];
    const Button = getControl('Button') as ComponentCtor;

    if (searchable && Button) {
      buttons.push(
        <Button {...buttonProps} onClick={this.handleSearch}>
          查询
        </Button>,
      );
    }

    if (this.resolveResettable() && Button) {
      buttons.push(
        <Button
          className="FormSearch-button"
          size={formControlSize}
          onClick={this.handleReset}
        >
          重置
        </Button>,
      );
    }

    const buttonGroupClassNames = ['FormSearch-buttonGroup'];

    if (standalone) {
      buttonGroupClassNames.push('is-standalone');
    }

    const buttonGroup: ReactNode =
      buttons.length > 0 ? (
        <div className={buttonGroupClassNames.join('')}>{buttons}</div>
      ) : null;

    if ((standalone || !searchable) && Button) {
      // for submission when the Enter key pressed
      formChildren.push(
        <div style={{ display: 'none' }}>
          <Button nativeType="submit" onClick={this.handleSearch}>
            替身查询
          </Button>
        </div>,
      );
    }

    if (!standalone) {
      formChildren.push(buttonGroup);
    }

    const Form = getControl('Form') as ComponentCtor;

    const form = Form ? (
      <Form
        value={this.condition}
        controlSize={formControlSize}
        layout={this.getBehavior('formLayout')}
        labelOption={{ width: this.resolveLabelWidth() }}
      >
        {formChildren}
      </Form>
    ) : null;

    return (
      <div className="FormSearch">
        {standalone ? [form, buttonGroup] : [form]}
      </div>
    );
  }
}
