import { ReactNode } from 'react';

import { TableViewStructuralWidget } from 'handie-react/dist/widgets/class';

import style from './style.scss';

export default class TableViewWidget extends TableViewStructuralWidget {
  constructor(props) {
    super(props);
    this.setStyleClassNames(style);
  }

  public render(): ReactNode {
    const classNames = [this.getStyleClassName('TableView')];

    if (this.config.className) {
      classNames.push(this.config.className);
    }

    return (
      <div className={classNames.join(' ')}>
        {[this.renderSearch(), this.renderActionBar(), this.renderDataTable()]}
      </div>
    );
  }
}
