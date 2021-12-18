import { ReactNode } from 'react';

import { ComponentCtor, omit, getControl } from 'handie-react';
import { ActionHeadlessWidget } from 'handie-react/dist/widgets';

export default class IconActionWidget extends ActionHeadlessWidget {
  public render(): ReactNode {
    const props = omit(this.config, ['showIcon', 'iconOnly', 'icon', 'refs']);
    const classNames: string[] = ['ActionWidget', 'IconActionWidget'];

    const { icon, className } = this.config;

    if (icon) {
      props.refs = icon;
    }

    const { primary, danger } = this.props.action;

    if (primary) {
      classNames.push('IconActionWidget--primary');
    }

    if (danger) {
      classNames.push('IconActionWidget--danger');
    }

    if (className) {
      classNames.push(className);
    }

    props.className = classNames.join(' ');

    const Icon = getControl('Icon') as ComponentCtor;

    return Icon ? <Icon {...props} onClick={() => this.onExecute()} /> : null;
  }
}
