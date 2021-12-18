import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { BooleanFieldHeadlessWidget } from 'handie-react/dist/widgets';

export default class RadioEditBooleanFieldWidget extends BooleanFieldHeadlessWidget {
  public render(): ReactNode {
    const Radio = getControl('Radio') as ComponentCtor;
    const RadioGroup = getControl('RadioGroup') as ComponentCtor;

    const positiveOption: ReactNode = Radio ? (
      <Radio value={true}>{this.positiveLabel}</Radio>
    ) : null;

    const negativeOption: ReactNode = Radio ? (
      <Radio value={false}>{this.negativeLabel}</Radio>
    ) : null;

    return RadioGroup ? (
      <RadioGroup value={this.props.value} onChange={this.onChange}>
        {this.negativeFirst
          ? [negativeOption, positiveOption]
          : [positiveOption, negativeOption]}
      </RadioGroup>
    ) : null;
  }
}
