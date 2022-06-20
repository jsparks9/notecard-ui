import { Box, TextField } from "@mui/material";

interface IRegisterProps {

}

function Register(props: IRegisterProps) {
    return ( 
    <>
        <h4>Please enter registration details</h4>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
            <TextField
                id="un-registration"
                label="myusername@revature.net"
                type="Email"
            />
            <TextField
                id="fn-registration"
                label="First Name"
                type="text"
            />
            <TextField
                id="ln-registration"
                label="Last Name"
                type="text"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <TextField
                id="password-registration"
                label="Password"
                type="password"
                autoComplete="current-password"
                helperText="Password must include: "
            />
            </div>
        </Box>
      </>);
}

export default Register;