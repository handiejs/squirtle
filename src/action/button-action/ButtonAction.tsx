import { ReactNode } from 'react';
import { ButtonActionStructuralWidget } from 'handie-react/dist/widgets';

export default class ButtonActionWidget extends ButtonActionStructuralWidget {
  public render(): ReactNode {
    return this.renderButton({
      className: this.resolveClassNames('ButtonActionWidget'),
      onClick: () => this.onExecute(),
    });
  }
}
