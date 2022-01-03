import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { LinkActionStructuralWidget } from 'handie-react/dist/widgets';

export default class LinkActionWidget extends LinkActionStructuralWidget {
  public render(): ReactNode {
    const Link = getControl('Link') as ComponentCtor;

    return Link ? (
      <Link {...this.resolveProps()} onClick={() => this.onExecute()}>
        {this.renderContent()}
      </Link>
    ) : null;
  }
}
