import * as React from "react";

export type ImageOnLoadType = {
  handleImageOnLoad: () => void;
  imageVisibility: React.CSSProperties;
  imageOpactity: React.CSSProperties;
};

export const useImageOnLoad = (): ImageOnLoadType => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const handleImageOnLoad = () => setIsLoaded(true);

  const imageVisibility: React.CSSProperties = {
    visibility: isLoaded ? "hidden" : "visible",
    filter: "blur(10px)",
    transition: "visibility 0ms ease-out 500ms"
  };

  const imageOpactity: React.CSSProperties = {
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 500ms ease-in 0ms"
  };

  return { handleImageOnLoad, imageVisibility, imageOpactity };
};
