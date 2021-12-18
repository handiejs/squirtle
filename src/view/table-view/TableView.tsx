import { ReactNode } from 'react';

import { TableViewHeadlessWidget } from 'handie-react/dist/widgets';

export default class TableViewWidget extends TableViewHeadlessWidget {
  public render(): ReactNode {
    const classNames = ['TableView'];

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
