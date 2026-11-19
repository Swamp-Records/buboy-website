import Image from "next/image";
import boyTeeBlack from "../../../public/shop-boy-tee-black.jpg";
import boyTeeTrueNavy from "../../../public/shop-boy-tee-true-navy.jpg";
import rockstarPoster from "../../../public/shop-rockstar-poster.jpg";
import rockstarTeeBlack from "../../../public/shop-rockstar-tee-black.jpg";
import rockstarTeeWhite from "../../../public/shop-rockstar-tee-white.jpg";
import sketchbookTote from "../../../public/shop-sketchbook-tote.jpg";

const merch = [
  {
    slug: "boy-tee-black",
    name: "boy tee black",
    type: "Shirt",
    price: 25,
    image: boyTeeBlack,
  },
  {
    slug: "boy-tee-true-navy",
    name: "boy tee true navy",
    type: "Shirt",
    price: 25,
    image: boyTeeTrueNavy,
  },
  {
    slug: "buboy-rockstar-tee-black",
    name: "buboy rockstar tee black",
    type: "Shirt",
    price: 25,
    image: rockstarTeeBlack,
  },
  {
    slug: "buboy-rockstar-tee-white",
    name: "buboy rockstar tee white",
    type: "Shirt",
    price: 25,
    image: rockstarTeeWhite,
  },
  {
    slug: "sketchbook-tote",
    name: "sketchbook tote",
    type: "Bag",
    price: 20,
    image: sketchbookTote,
  },
  {
    slug: "buboy-rockstar-poster",
    name: "buboy rockstar poster",
    type: "Poster/Print",
    price: 10,
    image: rockstarPoster,
  },
];

export default function ShopWindow() {
  return (
    <div className="shop-content">
      {merch.map(({ slug, name, type, price, image }) => (
        <a
          key={slug}
          className="shop-card"
          href={`https://buboy.bandcamp.com/merch/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image className="shop-card-image" src={image} alt="" unoptimized />
          <div className="shop-card-details">
            <p className="shop-card-name">{name}</p>
            <p className="shop-card-type">{type}</p>
            <p><strong>${price}</strong> USD</p>
          </div>
          <span className="sr-only">View on Bandcamp (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
