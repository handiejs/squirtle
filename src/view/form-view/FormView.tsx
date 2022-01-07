import { ReactNode } from 'react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

export default class FormViewWidget extends FormViewStructuralWidget {
  public componentDidMount(): void {
    this.fetchData();
  }

  public render(): ReactNode {
    return <div className="FormView">{this.renderForm()}</div>;
  }
}
