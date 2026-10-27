import type { ComponentType } from "react";
import GalleryWindow from "./galleryWindow";
import ShopWindow from "./shopWindow";
import PressKitWindow from "./pressKitWindow";
import VideoWindow from "./videosWindow";
import TicketsWindow from "./ticketsWindow";
import BlogWindow from "./blogWindow";

// Maps each nav item id to the component rendered inside its window.
export const windowContent: Record<string, ComponentType> = {
  gallery: GalleryWindow,
  shop: ShopWindow,
  "press-kit": PressKitWindow,
  video: VideoWindow,
  tickets: TicketsWindow,
  blog: BlogWindow,
};