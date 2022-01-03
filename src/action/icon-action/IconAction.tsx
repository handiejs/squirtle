import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { IconActionStructuralWidget } from 'handie-react/dist/widgets';

export default class IconActionWidget extends IconActionStructuralWidget {
  public render(): ReactNode {
    const Icon = getControl('Icon') as ComponentCtor;

    return Icon ? (
      <Icon {...this.resolveProps()} onClick={() => this.onExecute()} />
    ) : null;
  }
}
