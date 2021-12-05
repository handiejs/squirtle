import { ReactNode } from 'react'
import { TableViewHeadlessWidget } from 'handie-react/dist/widgets';

export default class TableViewWidget extends TableViewHeadlessWidget {
  public render(): ReactNode {
    return this.renderDataTable();
  }
}
