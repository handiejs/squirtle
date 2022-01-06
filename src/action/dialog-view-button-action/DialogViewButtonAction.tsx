import { ReactNode } from 'react';

import {
  ButtonActionWidgetConfig,
  ActionWidgetState,
  getRenderer,
} from 'handie-react';
import { ButtonActionStructuralWidget } from 'handie-react/dist/widgets/class';

interface DialogViewButtonActionWidgetConfig extends ButtonActionWidgetConfig {
  readonly view: string;
}

export default class DialogViewButtonActionWidget extends ButtonActionStructuralWidget<
  ActionWidgetState,
  DialogViewButtonActionWidgetConfig
> {
  private showDialog(): void {
    this.$$view.emit(`dialog-view-show.${this.$$view.getId()}`);
  }

  public render(): ReactNode {
    const ViewRenderer = getRenderer('ViewRenderer');

    return (
      <div
        className={this.resolveClassNames('DialogViewButtonActionWidget')}
        style={{ display: 'inline-block' }}
      >
        {this.renderButton({ onClick: () => this.showDialog() })}
        {ViewRenderer ? (
          <ViewRenderer view={this.config.view} params={[this.$$view]} />
        ) : null}
      </div>
    );
  }
}
