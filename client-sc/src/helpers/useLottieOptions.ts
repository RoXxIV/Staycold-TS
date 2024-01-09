/**
 * @fileoverview useLottieOptions hook to set lottie options
 */
import type { IlottieOptions } from "@/types/lottieOptions";

export const useLottieOptions = (animationData: any): IlottieOptions => {
  return {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };
};
