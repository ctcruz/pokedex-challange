import React, { useState } from "react";
import { Avatar, CircularProgress, Box } from "@mui/material";

interface PokemonAvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export const PokemonAvatar: React.FC<PokemonAvatarProps> = ({
  src,
  alt,
  size = 40,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={size / 2} />
        </Box>
      )}
      <Avatar
        src={src}
        alt={alt}
        sx={{ width: size, height: size, opacity: loading ? 0 : 1 }}
        imgProps={{
          onLoad: () => setLoading(false),
          onError: () => setLoading(false),
        }}
      />
    </Box>
  );
};
