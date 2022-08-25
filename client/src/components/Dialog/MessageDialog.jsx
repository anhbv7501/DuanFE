import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { Button, Card, Modal } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import useCommon from "../../hooks/common";
import "./styles.scss";

const MessageDialog = () => {
  const { messageDialog, closeMessage } = useCommon();

  /**
   * onOkButtonHandler
   * handle event click on Ok button
   */
  const onOkButtonHandler = useCallback(() => {
    // clone dismiss function
    const dismiss = messageDialog.data?.dismiss;

    // close message dialog
    closeMessage();

    // excute dismiss function if available
    if (dismiss) {
      dismiss();
    }
  }, [closeMessage, messageDialog.data?.dismiss]);

  const Icon = useMemo(() => {
    const iconType = messageDialog.data?.type || "INFO";

    switch (iconType) {
      case "INFO":
        return <InfoOutlinedIcon className="icon text-success" />;
      case "WARNING":
        return <WarningAmberOutlinedIcon className="icon text-warning" />;
      case "ERROR":
        return <ErrorOutlineOutlinedIcon className="icon text-danger" />;
    }
  }, [messageDialog.data?.type]);

  return useMemo(
    () => (
      <Modal open={messageDialog.open} className="dialog-container">
        <Card className="d-flex flex-column col-12 col-sm-12 col-xl-3 dialog message-dialog">
          {messageDialog.data?.title && (
            <label className="title">{messageDialog.data?.title}</label>
          )}

          <div className="d-flex flex-row  align-items-center content">
            <div className="logo">{Icon}</div>
            <label>{messageDialog.data?.message}</label>
          </div>

          <div className="d-flex justify-content-center align-items-center footer">
            {/* <Button variant="outlined" className="button" onClick={onOkButtonHandler}>
              OK
            </Button> */}
            <button type="submit" className="btn btn-primary btn-sm px-5 button" onClick={onOkButtonHandler}>
          Đồng ý 
          </button>
          </div>
        </Card>
      </Modal>
    ),
    [
      Icon,
      messageDialog.data?.message,
      messageDialog.data?.title,
      messageDialog.open,
      onOkButtonHandler,
    ]
  );
};

export default MessageDialog;
