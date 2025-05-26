import { Box, CircularProgress } from "@mui/material";
import { memo } from "react";

export const Loader = memo(({ height = "0vh" }: { height?: string }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight={height}
  >
    <CircularProgress />
  </Box>
));
