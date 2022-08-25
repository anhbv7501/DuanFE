import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Button, Card, Modal } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import useCommon from "../../hooks/common";
import "./styles.scss";

const ConfirmDialog = () => {
  const { confirmDialog, closeConfirm } = useCommon();
  /**
   * wrapper action
   */
  const wrapperAction = useCallback(
    (action) => () => {
      if (action) {
        // close message dialog
        closeConfirm();

        action();
      } else {
        // close message dialog
        closeConfirm();
      }
    },
    [closeConfirm]
  );

  const Icon = useMemo(() => {
    const iconType = confirmDialog.data?.type || "INFO";

    switch (iconType) {
      case "INFO":
        return <InfoOutlinedIcon className="icon text-success" />;
      case "WARNING":
        return <WarningAmberOutlinedIcon className="icon text-warning" />;
      case "ERROR":
        return <ErrorOutlineOutlinedIcon className="icon text-danger" />;
    }
  }, [confirmDialog.data?.type]);

  return useMemo(
    () => (
      <Modal open={confirmDialog.open} className="dialog-container">
        <Card className="d-flex flex-column col-12 col-sm-12 col-xl-3 dialog confirm-dialog">
          {confirmDialog.data?.title && <label className="title text-center">{confirmDialog.data?.title}</label>}

          <div className="d-flex flex-row align-items-center content">
            <div className="logo">{Icon}</div>
            <label>{confirmDialog.data?.message}</label>
          </div>

          <div className="d-flex justify-content-center align-items-center footer">
            {(confirmDialog.data?.actions || []).map((item, index) => (
              <div key={index} className="w-100 override button">
                <Button
                  variant="outlined"
                  className={`w-100 button${item.className}`}
                  onClick={wrapperAction(item.action)}
                >
                  {item.label}
                </Button>
              </div>
            ))}
            {(confirmDialog.data?.actions || []).length <= 0 && (
              <Button variant="outlined" className="button" onClick={wrapperAction()}>
                OK
              </Button>
            )}
          </div>
        </Card>
      </Modal>
    ),
    [
      Icon,
      confirmDialog.data?.actions,
      confirmDialog.data?.message,
      confirmDialog.data?.title,
      confirmDialog.open,
      wrapperAction,
    ]
  );
};

export default ConfirmDialog;
