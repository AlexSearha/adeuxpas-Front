import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface LinearDeterminateProps {
  ms: number;
}

function Loading() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

function LinearDeterminate({ ms }: LinearDeterminateProps) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const stepDuration = ms / 100;

    let currentStep = 0;
    const timer = setInterval(() => {
      setProgress(currentStep);
      currentStep += 1;

      if (currentStep > 100) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

export { Loading, LinearDeterminate };
