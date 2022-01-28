import { FormControlPrefixAndSuffix } from 'petals-ui/dist/form-control';
import { FloatFieldWidgetConfig } from 'handie-react';

interface NumberFloatFieldWidgetConfig extends FloatFieldWidgetConfig {
  readonly prefix?: FormControlPrefixAndSuffix | string;
  readonly suffix?: FormControlPrefixAndSuffix | string;
}

export { NumberFloatFieldWidgetConfig };
