import { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { EnumFieldStructuralWidget } from 'handie-react/dist/widgets';

import { RadioEnumFieldWidgetConfig } from './typing';

export default class RadioEditEnumFieldWidget extends EnumFieldStructuralWidget<RadioEnumFieldWidgetConfig> {
  public render(): ReactNode {
    const RadioGroup = getControl('RadioGroup') as ComponentCtor;
    const Radio = getControl('Radio') as ComponentCtor;
    const Tooltip = getControl('Tooltip') as ComponentCtor;
    const Icon = getControl('Icon') as ComponentCtor;

    return RadioGroup ? (
      <RadioGroup
        value={this.props.value}
        onChange={(value) => this.onChange(value)}
      >
        {this.state.options.map((opt) =>
          Radio ? (
            <Radio
              key={`Option${opt.value}OfRadioEditEnumFieldWidget`}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.hint ? (
                <>
                  {opt.label}
                  {Tooltip ? (
                    <Tooltip content={opt.hint}>
                      {Icon ? (
                        <Icon
                          refs={
                            this.config.hintIcon ||
                            this.getCommonBehavior('field.hintIcon')
                          }
                        />
                      ) : null}
                    </Tooltip>
                  ) : null}
                </>
              ) : (
                opt.label
              )}
            </Radio>
          ) : null,
        )}
      </RadioGroup>
    ) : null;
  }
}
