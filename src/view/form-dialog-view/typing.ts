import { ViewWidgetConfig, ObjectViewWidgetState } from 'handie-react';

interface FormDialogViewWidgetConfig extends ViewWidgetConfig {
  readonly dialogWidth?: number | string;
  readonly moduleLabel?: string;
}

interface FormDialogViewWidgetState extends ObjectViewWidgetState {
  dialogVisible: boolean;
}

export { FormDialogViewWidgetConfig, FormDialogViewWidgetState };
