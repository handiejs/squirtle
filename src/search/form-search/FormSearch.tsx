import { ReactNode } from 'react';

import {
  ComponentCtor,
  FilterDescriptor,
  isBoolean,
  isNumber,
  getControl,
  getRenderer,
  renderFormFieldNodes,
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
      <FormField
        label={
          this.config.hideFormControlLabel !== true ? filter.label : undefined
        }
        key={`${filter.name}FilterOfFormSearchWidget`}
      >
        {FilterRenderer ? (
          <FilterRenderer
            filter={filter}
            value={this.state.condition[filter.name]}
            onChange={(filterName, value) =>
              this.setFilterValue(filterName, value)
            }
          />
        ) : null}
      </FormField>
    ) : null;
  }

  private renderFilterRow(
    filters: FilterDescriptor[],
    index: number,
  ): ReactNode {
    return (
      <div
        className={this.getStyleClassName('FormSearch-filterRow')}
        key={`FilterRow${index}OfFormSearchWidget`}
      >
        {filters.map((filter) => this.renderFilter(filter))}
      </div>
    );
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
    const formChildren: ReactNode[] = renderFormFieldNodes(
      this.filters,
      this.config.arrangement,
      this.renderFilter.bind(this),
      this.renderFilterRow.bind(this),
    );
    const standalone = this.getBehavior('actionsStandalone') === true;
    const searchable = this.resolveSearchable();
    const buttonProps: Record<string, any> = {
      className: this.getStyleClassName('FormSearch-button'),
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
        <Button
          {...buttonProps}
          key="SearchButtonOfFormSearchWidget"
          onClick={(evt) => this.handleSearch(evt)}
        >
          查询
        </Button>,
      );
    }

    if (this.resolveResettable() && Button) {
      buttons.push(
        <Button
          className={this.getStyleClassName('FormSearch-button')}
          size={formControlSize}
          key="ResetButtonOfFormSearchWidget"
          onClick={(evt) => this.handleReset(evt)}
        >
          重置
        </Button>,
      );
    }

    const buttonGroupClassNames = [
      this.getStyleClassName('FormSearch-buttonGroup'),
    ];

    if (standalone) {
      buttonGroupClassNames.push(this.getStyleClassName('is-standalone'));
    }

    const buttonGroup: ReactNode =
      buttons.length > 0 ? (
        <div
          className={buttonGroupClassNames.join('')}
          key="ButtonGroupOfFormSearchWidget"
        >
          {buttons}
        </div>
      ) : null;

    if ((standalone || !searchable) && Button) {
      // for submission when the Enter key pressed
      formChildren.push(
        <div
          style={{ display: 'none' }}
          key="SearchButtonProxyOfFormSearchWidget"
        >
          <Button nativeType="submit" onClick={(evt) => this.handleSearch(evt)}>
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
        key="FormOfFormSearchWidget"
        value={this.state.condition}
        controlSize={formControlSize}
        layout={this.getBehavior('formLayout')}
        labelOption={{ width: this.resolveLabelWidth() }}
      >
        {formChildren}
      </Form>
    ) : null;

    return (
      <div className={this.getStyleClassName('FormSearch')}>
        {standalone ? [form, buttonGroup] : [form]}
      </div>
    );
  }
}
