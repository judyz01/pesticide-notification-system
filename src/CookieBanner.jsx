import * as React from "react";
import { Box, Button, Typography, Dialog } from "@mui/material";
import { useTranslation } from "react-i18next";
import posthog from 'posthog-js';


function CookieBanner() {
    const { t } = useTranslation();
    const [show, setShow] = React.useState(true);

    const acceptCookies = () => { 
        posthog.opt_in_capturing(); 
    };
    
    const declineCookies = () => {
        posthog.opt_out_capturing(); 
    };

    return (
        <Dialog
            open={show}
        >
            <Box sx={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 12000, backgroundColor: "#FFFFFF", width: "300px", height: "150px", boxShadow: 10, p: "20px", alignItems: "center", display: "flex", flexDirection: "column"}}>
                <Typography sx={{fontSize: "14px", fontWeight: 600, color: "black", ml: "9px"}}>
                    {t("Cookie")}
                </Typography>
                <Box sx={{display: "flex", flexDirection: "row", mt: "5px"}}>
                <Button
                    sx={{
                        padding: "10px",
                        variant:"contained", 
                        backgroundColor:"#FFFFFF", 
                        "&:hover": {
                        backgroundColor: "#daf5d7",
                        "@media (hover: none)": {
                            backgroundColor: "#FFFFFF",
                            "&:active": {
                            backgroundColor: "#daf5d7"
                            }
                        }}
                    }}
                    onClick={() => {
                        acceptCookies();
                        setShow(false);
                    }}
                >
                    <Typography sx={{color: "green"}}>
                    {t("Accept")}
                    </Typography>
                </Button>
                <Button
                    sx={{
                        padding: "10px",
                        variant:"contained", 
                        backgroundColor:"#FFFFFF", 
                        "&:hover": {
                        backgroundColor: "#daf5d7",
                        "@media (hover: none)": {
                            backgroundColor: "#FFFFFF",
                            "&:active": {
                            backgroundColor: "#daf5d7"
                            }
                        }}
                    }}
                    onClick={() => {
                        declineCookies();
                        setShow(false);
                    }}
                >
                   <Typography sx={{color: "red"}}>
                    {t("Decline")}
                    </Typography>
                </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default CookieBanner;