import type { ComponentType } from "react";
import GalleryWindow from "./gallery";
import ShopWindow from "./shop";
import PressKitWindow from "./pressKit";
import VideoWindow from "./videos";
import TicketsWindow from "./tickets";
import BlogWindow from "./blog";

// Maps each nav item id to the component rendered inside its window.
export const windowContent: Record<string, ComponentType> = {
  gallery: GalleryWindow,
  shop: ShopWindow,
  "press-kit": PressKitWindow,
  video: VideoWindow,
  tickets: TicketsWindow,
  blog: BlogWindow,
};