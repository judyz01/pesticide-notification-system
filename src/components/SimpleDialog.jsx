import React, { useState, useEffect, useRef} from 'react';
import { useTranslation } from "react-i18next";
import QRCode from "react-qr-code";
import ReactToPrint from 'react-to-print';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Button, Dialog, DialogTitle, IconButton, Snackbar, Stack } from '@mui/material';

export default function SimpleDialog(props) {
  const { t } = useTranslation();
  const PRINT_QR = t("Print QR");
  const SCAN_QR = t("Scan QR");


  const { onClose, open, qrCoords } = props;
  const QRRef = useRef(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  if (!qrCoords.lat  && !qrCoords.lng ) {
    return;
  }

  const handleClose = () => {
    onClose();
  };

  const getPageMargins = () => {
    return `@page { margin: '10px' '10px' '10px '10px' !important; }`;
  };

  var url = "https://pesticidenoi.netlify.app?lat=" + qrCoords.lat + "&lng=" + qrCoords.lng;

  const handleClick = () => {
    setSnackbarOpen(true);
    navigator.clipboard.writeText(url);
  }

  return (
    <Dialog 
      titlestyle={{textAlign: "center"}}
      onClose={handleClose} 
      open={open}                    
    >
      <div ref={QRRef} style={{ background: 'white', padding: '16px', justifyContent:"center", alignItems:"center"}}>
        <DialogTitle textAlign="center"> {SCAN_QR} </DialogTitle>
          <QRCode
            size={256}
            style={{ width: "100%"}}
            value={url}
            viewBox={`0 0 256 256`}
          />
        </div>

        <Stack sx={{pb:"15px"}} direction="row" justifyContent="center" alignItems="center">
          <ReactToPrint
            pageStyle={getPageMargins}
            // documentTitle = {"Pesticide Notification System"}
            trigger={() => (
              <Button data-cy="print-qr" sx={{p: "20px"}} >
                {PRINT_QR}
              </Button>
              )}
            content={() => QRRef.current}>
          </ReactToPrint>

          <IconButton data-cy="share-qr" onClick={handleClick}>
            <IosShareIcon />
          </IconButton>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            autoHideDuration={2500}
            message="Copied to clipboard"
          />
        </Stack>
    </Dialog>
  );
};

