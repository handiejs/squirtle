import { ReactNode } from 'react';

import { TableViewHeadlessWidget } from 'handie-react/dist/widgets';

import style from './style.scss';

export default class TableViewWidget extends TableViewHeadlessWidget {
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
