import { ReactNode } from 'react';
import { TextFieldStructuralWidget } from 'handie-react/dist/widgets';

export default class TextareaReadTextFieldWidget extends TextFieldStructuralWidget {
  public render(): ReactNode {
    return <p>{this.formatValue()}</p>;
  }
}
