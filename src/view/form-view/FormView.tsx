import { ReactNode } from 'react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets';

export default class FormViewWidget extends FormViewStructuralWidget {
  public render(): ReactNode {
    return <div className="FormView">{this.renderForm()}</div>;
  }
}
