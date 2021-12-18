import { ReactNode } from 'react';

import { ComponentCtor, getRenderer } from 'handie-react';
import { ObjectViewHeadlessWidget } from 'handie-react/dist/widgets';

export default class FormViewWidget extends ObjectViewHeadlessWidget {
  private get id() {
    return '';
    // return this.$route.params.id || '';
  }

  public componentDidMount(): void {
    const ctx = this.context;

    if (this.id && ctx.getOne) {
      ctx.getOne(this.id, (data) => {
        this.setState({ dataSource: data });
        this.context.setValue(data);
      });
    }
  }

  public render(): ReactNode {
    const FormRenderer = getRenderer('FormRenderer') as ComponentCtor;

    return (
      <div className="FormView">
        {FormRenderer ? (
          <FormRenderer
            fields={this.fields}
            value={this.state.value}
            validation={this.state.validation}
            config={this.config}
            onChange={this.onFieldValueChange}
          />
        ) : null}
      </div>
    );
  }
}