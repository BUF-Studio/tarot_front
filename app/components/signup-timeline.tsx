"use client";

import React, { useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "@mui/material";
import Check from "@mui/icons-material/Check";

interface StepsType {
  label: string;
  path: string;
}

const steps: StepsType[] = [
  { label: 'Account Setup', path: '/signup/account-setup' },
  { label: 'Verification', path: '/signup/verification' },
];

const SignupTimeline: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);

  // const QontoConnector = styled(StepConnector)(({ theme }) => ({
  //   [`&.${stepConnectorClasses.alternativeLabel}`]: {
  //     top: 10,
  //     left: "calc(-50% + 16px)",
  //     right: "calc(50% + 16px)",
  //   },
  //   [`&.${stepConnectorClasses.active}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       borderColor: theme.palette.primary.main,
  //     },
  //   },
  //   [`&.${stepConnectorClasses.completed}`]: {
  //     [`& .${stepConnectorClasses.line}`]: {
  //       borderColor: theme.palette.primary.main,
  //     },
  //   },
  //   [`& .${stepConnectorClasses.line}`]: {
  //     borderColor:
  //       theme.palette.mode === "dark"
  //         ? theme.palette.grey[800]
  //         : theme.palette.grey[400],

  //     borderTopWidth: 3,
  //     borderRadius: 5,
  //   },
  // }));

  // const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  //   ({ theme, ownerState }) => ({
  //     color:
  //       theme.palette.mode === "dark"
  //         ? theme.palette.grey[700]
  //         : theme.palette.grey[400],
  //     display: "flex",
  //     height: 22,
  //     alignItems: "center",
  //     ...(ownerState.active && {
  //       color: theme.palette.primary.main,
  //     }),
  //     "& .QontoStepIcon-completedIcon": {
  //       color: theme.palette.primary.main,

  //       zIndex: 1,
  //       fontSize: 18,
  //     },
  //     "& .QontoStepIcon-circle": {
  //       width: 8,
  //       height: 8,
  //       borderRadius: "50%",
  //       backgroundColor:
  //         theme.palette.mode === "dark"
  //           ? theme.palette.grey[700]
  //           : theme.palette.grey[400],
  //     },
  //   })
  // );

  // function QontoStepIcon(props: StepIconProps) {
  //   const { active, completed, className } = props;

  //   return (
  //     <QontoStepIconRoot ownerState={{ active }} className={className}>
  //       {completed ? (
  //         <Check className="QontoStepIcon-completedIcon" />
  //       ) : (
  //         <div className="QontoStepIcon-circle" />
  //       )}
  //     </QontoStepIconRoot>
  //   );
  // }

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
      <Stepper
        activeStep={currentStep}
        // alternativeLabel
        // connector={<QontoConnector />}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              // StepIconComponent={QontoStepIcon}
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