"use client";

import SignupTimeline from "@/app/components/signup-timeline";
import {
  styled,
  type BoxProps,
  type ContainerProps,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";

const FullHeightSection = styled('section')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
});

const TimelineContainer = styled(Box)<ContainerProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: "100%",
  padding: theme.spacing(2),
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden', // Prevent scrolling
  [theme.breakpoints.up('md')]: {
    overflow: 'auto', // Allow scrolling on larger screens if needed
  },
}));

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <FullHeightSection>
      <TimelineContainer>
        <Box width="100%" display="flex" justifyContent="center">
          <SignupTimeline />
        </Box>
      </TimelineContainer>
      <ContentContainer>
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent={isLargeScreen ? "center" : "flex-start"}
          height="100%"
          overflow={isLargeScreen ? "hidden" : "auto"}
          py={4}
        >
          {children}
        </Box>
      </ContentContainer>
    </FullHeightSection>
  );
}