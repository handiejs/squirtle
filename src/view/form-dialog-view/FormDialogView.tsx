import { ReactNode } from 'react';

import {
  ComponentCtor,
  ViewWidgetConfig,
  ListViewContext,
  ObjectViewContext,
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

  protected fetchData(): void {
    const ctx = this.$$view;
    const opener = ctx.getOpener()!;
    if (opener.getView().category === 'object' && ctx.getOne) {
      ctx.getOne((opener as ObjectViewContext).getValue(), (data) => {
        this.setState({ dataSource: data });
        ctx.setValue(data);
      });
    }
  }

  public componentDidMount(): void {
    const opener = this.$$view.getOpener()!;

    opener.on(`dialog-view-show.${opener.getId()}`, () => {
      this.setState({ dialogVisible: true }, () => this.fetchData());
    });

    this.on('submit', () => {
      this.$$view.insert(
        this.state.value,
        () => {
          if (opener.getView().category === 'list') {
            (opener as ListViewContext).reload();
          } else {
            (opener as ObjectViewContext).getParent()!.reload();
          }

          this.closeDialog();
        },
        (message) => this.$$app.alert(message),
      );
    });
  }

  public componentWillUnmount(): void {
    const opener = this.$$view.getOpener()!;

    opener.off(`dialog-view-show.${opener.getId()}`);
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
        disableMask
        onClose={closeDialog}
      >
        {this.renderForm()}
      </Dialog>
    ) : null;
  }
}
