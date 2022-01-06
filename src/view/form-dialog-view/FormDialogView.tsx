import { ReactNode } from 'react';

import {
  ComponentCtor,
  ViewWidgetConfig,
  ObjectViewWidgetState,
  getControl,
} from 'handie-react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

interface FormDialogViewWidgetConfig extends ViewWidgetConfig {
  readonly dialogWidth?: number | string;
}

interface FormDialogViewWidgetState extends ObjectViewWidgetState {
  dialogVisible: boolean;
}

export default class FormDialogViewWidget extends FormViewStructuralWidget<
  FormDialogViewWidgetState,
  FormDialogViewWidgetConfig
> {
  public readonly state = {
    loading: false,
    dataSource: {},
    value: {},
    validation: {},
    dialogVisible: false,
  } as FormDialogViewWidgetState;

  private closeDialog(): void {
    this.setState({ dialogVisible: false }, () => this.$$view.reset());
  }

  public componentDidMount(): void {
    super.componentDidMount();

    const parent = this.$$view.getParent()!;

    parent.on(`dialog-view-show.${parent.getId()}`, () =>
      this.setState({ dialogVisible: true }),
    );

    this.on('submit', () => {
      this.$$view.insert(
        this.state.value,
        () => {
          parent.reload();
          this.closeDialog();
        },
        (message) => this.$$app.alert(message),
      );
    });
  }

  public componentWillUnmount(): void {
    const parent = this.$$view.getParent()!;

    parent.off(`dialog-view-show.${parent.getId()}`);
  }

  public render(): ReactNode {
    const Dialog = getControl('Dialog') as ComponentCtor;
    const Button = getControl('Button') as ComponentCtor;
    const closeDialog = this.closeDialog.bind(this);

    return Dialog ? (
      <Dialog
        title={this.config.title}
        width={this.config.dialogWidth || 520}
        footer={
          Button ? (
            <>
              <Button onClick={closeDialog}>取消</Button>
              <Button color="primary" onClick={() => this.$$view.submit()}>
                确认
              </Button>
            </>
          ) : null
        }
        visible={this.state.dialogVisible}
        centered
        onClose={closeDialog}
      >
        {this.renderForm()}
      </Dialog>
    ) : null;
  }
}
