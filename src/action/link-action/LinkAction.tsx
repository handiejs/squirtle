import { ReactNode } from 'react';

import { ComponentCtor, omit, getControl } from 'handie-react';
import { ActionHeadlessWidget } from 'handie-react/dist/widgets';

export default class LinkActionWidget extends ActionHeadlessWidget {
  public render(): ReactNode {
    const classNames: string[] = ['ActionWidget', 'LinkActionWidget'];

    if (this.config.className) {
      classNames.push(this.config.className);
    }

    const props = omit(this.config, ['showIcon', 'iconOnly', 'icon']);

    props.className = classNames.join(' ');

    const Link = getControl('Link') as ComponentCtor;

    return Link ? <Link {...props} onClick={() => this.onExecute()} /> : null;
  }
}
