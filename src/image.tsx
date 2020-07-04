import * as React from "react";
import { imageWrapperStyle, imageStyle } from "./styles";
import { useImageOnLoad, ImageOnLoadType } from "./useImageLoad";
import {
  useIntersectionObserver,
  IntersectionStatus
} from "./useIntersectionObserver";

type ProductType = {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  isShippingFree: boolean;
  discount: number;
  thumbUrl: string;
};

type ImageUrlType = Pick<ProductType, "imageUrl" | "thumbUrl">;
type ImageAttrType = { imageAlt: string; width: string };
type ImageStateType = { isLoading: boolean };
type ImageStyleType = {
  imageWrapperStyle: React.CSSProperties;
  imageStyle: React.CSSProperties;
};

type ImagePropsType = ImageUrlType &
  ImageAttrType &
  ImageStateType &
  ImageStyleType;

const Image = ({
  imageUrl,
  thumbUrl,
  imageAlt,
  width,
  isLoading,
  imageStyle,
  imageWrapperStyle
}: ImagePropsType) => {
  const [wrapperRef, setWrapperRef] = React.useState<HTMLDivElement>();

  const wrapperCallback = React.useCallback((node) => {
    setWrapperRef(node);
  }, []);

  const { isIntersecting }: IntersectionStatus = useIntersectionObserver(
    wrapperRef
  );

  const showImageSkeleton: boolean = isLoading || !isIntersecting;

  const {
    handleImageOnLoad,
    imageVisibility,
    imageOpactity
  }: ImageOnLoadType = useImageOnLoad();

  return (
    <div ref={wrapperCallback} style={imageWrapperStyle}>
      {showImageSkeleton ? (
        <p>Loading...</p>
      ) : (
        <>
          <img
            width={width}
            alt={imageAlt}
            src={thumbUrl}
            style={{ ...imageStyle, ...imageVisibility }}
          />

          <img
            width={width}
            alt={imageAlt}
            src={imageUrl}
            onLoad={handleImageOnLoad}
            style={{ ...imageStyle, ...imageOpactity }}
          />
        </>
      )}
    </div>
  );
};

Image.defaultProps = {
  width: "100%",
  imageWrapperStyle,
  imageStyle
};

export default React.memo(Image);
