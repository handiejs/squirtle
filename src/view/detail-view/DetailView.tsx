import { ReactNode } from 'react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DetailViewWidget extends FormViewStructuralWidget {
  public componentDidMount(): void {
    this.fetchData();
  }

  public render(): ReactNode {
    return (
      <div className="DetailView">{this.renderForm({ readonly: true })}</div>
    );
  }
}
