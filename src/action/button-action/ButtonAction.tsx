import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { ActionHeadlessWidget } from 'handie-react/dist/widgets';

export default class ButtonActionWidget extends ActionHeadlessWidget {
  public render(): ReactNode {
    const { primary, danger } = this.props.action;

    const classNames: string[] = ['ActionWidget', 'ButtonActionWidget'];

    if (this.config.className) {
      classNames.push(this.config.className);
    }

    const props: Record<string, any> = {
      className: classNames.join(' '),
      disabled: this.disabled,
    };

    if (this.config.size) {
      props.size = this.config.size;
    }

    if (primary) {
      props.color = 'primary';
    }

    if (danger) {
      props.color = 'danger';
    }

    const Button = getControl('Button') as ComponentCtor;

    return Button ? (
      <Button {...props} onClick={() => this.onExecute()}>
        {this.resolveContent()}
      </Button>
    ) : null;
  }
}
