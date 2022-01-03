import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { ButtonActionStructuralWidget } from 'handie-react/dist/widgets';

export default class ButtonActionWidget extends ButtonActionStructuralWidget {
  public render(): ReactNode {
    const Button = getControl('Button') as ComponentCtor;

    return Button ? (
      <Button {...this.resolveProps()} onClick={() => this.onExecute()}>
        {this.renderContent()}
      </Button>
    ) : null;
  }
}
