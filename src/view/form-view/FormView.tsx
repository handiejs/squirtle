import { ReactNode } from 'react';
import { ComponentCtor, getControl, normalizeClassName } from 'handie-react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

export default class FormViewWidget extends FormViewStructuralWidget {
  public componentDidMount(): void {
    this.fetchData();
  }

  public render(): ReactNode {
    const Wait = getControl('Wait') as ComponentCtor;

    return Wait ? (
      <Wait
        className={normalizeClassName('FormView', this.config.className)}
        busy={this.state.loading}
      >
        {this.renderForm()}
      </Wait>
    ) : null;
  }
}
