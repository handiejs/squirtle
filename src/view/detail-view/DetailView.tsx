import { ReactNode } from 'react';

import {
  ComponentCtor,
  ObjectViewWidgetState,
  isBoolean,
  capitalize,
  getControl,
  normalizeClassName,
} from 'handie-react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

import { DetailViewWidgetConfig } from './typing';
import defaultBehaviors from './behavior';
import style from './style.scss';

export default class DetailViewWidget extends FormViewStructuralWidget<
  ObjectViewWidgetState,
  DetailViewWidgetConfig
> {
  private isActionBarOutside(): boolean {
    if (isBoolean(this.config.actionBarOutside)) {
      return this.config.actionBarOutside!;
    }

    return isBoolean(this.getBehavior('actionBarOutside'))
      ? this.getBehavior('actionBarOutside')
      : this.getCommonBehavior('view.objectViewActionBarOutside', false);
  }

  private resolveActionBarAlignment(): 'left' | 'center' | 'right' {
    if (this.config.actionBarAlignment) {
      return this.config.actionBarAlignment;
    }

    return (
      this.getBehavior('actionBarAlignment') ||
      this.getCommonBehavior('view.objectViewActionBarAlignment', 'left')
    );
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setBehaviors('view.detail', defaultBehaviors);
  }

  public componentDidMount(): void {
    this.fetchData();
  }

  public render(): ReactNode {
    const outside = this.isActionBarOutside();
    const Wait = getControl('Wait') as ComponentCtor;
    const actionBar = this.renderActionBar(style['DetailViewWidget-actionBar']);

    return Wait ? (
      <Wait
        className={normalizeClassName(
          style.DetailViewWidget,
          style[
            `DetailViewWidget--actionBar${capitalize(
              this.resolveActionBarAlignment(),
            )}`
          ],
          { [style['DetailViewWidget--actionBarOutside']]: outside },
          this.config.className,
        )}
        busy={this.state.loading}
      >
        {outside ? (
          <>
            <div className={style['DetailViewWidget-formContainer']}>
              {this.renderForm({
                className: style['DetailViewWidget-form'],
                readonly: true,
              })}
            </div>
            {actionBar}
          </>
        ) : (
          this.renderForm({
            className: style['DetailViewWidget-form'],
            readonly: true,
            children: actionBar,
          })
        )}
      </Wait>
    ) : null;
  }
}
