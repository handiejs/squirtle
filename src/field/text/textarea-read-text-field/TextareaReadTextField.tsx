import { ReactNode } from 'react';
import { TextFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class TextareaReadTextFieldWidget extends TextFieldHeadlessWidget {
  public render(): ReactNode {
    return <p>{this.formatValue()}</p>;
  }
}
