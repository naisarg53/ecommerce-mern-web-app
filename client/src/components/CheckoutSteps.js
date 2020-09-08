import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Shipping from './Shipping';
import Register from './Register';
import PlaceOrder from './PlaceOrder';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
   
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Register', 'Shipping', 'Place Order'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Register />;
        case 1:
            return <Shipping />;
        case 2:
            return <PlaceOrder />;
        default:
            return 'Unknown stepIndex';
    }
}

export default function HorizontalLabelPositionBelowStepper(e) {
   
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };       

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div className="mt-5" style={{ textAlign: "center" }}>
                        <h3>Hope You Like Shopping!!!</h3><br></br>
                        <Link to="/" className="btn-lg btn-primary col-md-4">Buy More</Link>
                    </div>
                ) : (
                        <div>
                                < Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            
                            <div className="">
                                    <Button
                                        disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className="float-left"
                                    color="primary"
                                    variant="contained"
                                >
                                    {activeStep == 1 ? 'Back' : 'Add Shipping Address' }
              </Button>
                                <Button variant="contained" color="primary" onClick={handleNext} className="float-right">
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            
                        </div>
                    )}
            </div>
        </div>
    );
}
