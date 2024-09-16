"use client";

import React, { useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import StepLabel from "@mui/material/StepLabel";

import { usePathname, useRouter } from "next/navigation";

interface StepsType {
  label: string;
  path: string;
}

const steps: StepsType[] = [
  { label: "Account Setup", path: "/signup/account-setup" },
  { label: "Verification", path: "/signup/verification" },
];

const SignupTimeline: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);

  useEffect(() => {
    console.log(`Route Name ${pathname}`);
    const index = steps.findIndex((step) => step.path === pathname);
    setCurrentStep(index !== -1 ? index : 0);
  }, [pathname]);

  const handleStepClicked = (step: StepsType) => {
    const stepIndex = steps.indexOf(step);
    if (stepIndex <= currentStep) {
      router.push(step.path);
    }
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Stepper activeStep={currentStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              sx={{ cursor: "pointer" }}
              onClick={() => handleStepClicked(step)}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default SignupTimeline;
