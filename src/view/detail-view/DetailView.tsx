import { ReactNode } from 'react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets';

export default class DetailViewWidget extends FormViewStructuralWidget {
  public render(): ReactNode {
    return (
      <div className="DetailView">{this.renderForm({ readonly: true })}</div>
    );
  }
}
