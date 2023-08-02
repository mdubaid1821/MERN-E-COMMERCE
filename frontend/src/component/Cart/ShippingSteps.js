import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import {FaShippingFast} from "react-icons/fa";
import {MdLibraryAddCheck} from "react-icons/md";
import {MdAccountBalanceWallet} from "react-icons/md";
import "./ShippingSteps.css";

const ShippingSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <FaShippingFast />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalanceWallet />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default ShippingSteps;