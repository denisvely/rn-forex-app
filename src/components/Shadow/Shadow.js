import React from "react";
import { Shadow } from "react-native-shadow-2";

export default function CustomShadow({
  children,
  useShadow = true,
  startColor = "#00000001",
  finalColor = "#00000075",
  offset = [0, 2],
  distance = 4,
  paintInside = true,
  ...props
}) {
  return useShadow ? (
    <Shadow
      startColor={startColor}
      finalColor={finalColor}
      offset={offset}
      distance={distance}
      paintInside={paintInside}
      {...props}
    >
      {children}
    </Shadow>
  ) : (
    children
  );
}
