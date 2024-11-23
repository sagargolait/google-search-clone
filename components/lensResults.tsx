"use client";

import Link from "next/link";
import Masonry from "react-masonry-css";

interface LensResults {
  displayLink: string;
  title: string;
  link: string;
  image: {
    thumbnailLink: string;
  };
}
const LensResults = ({ results }: { results: LensResults[] }) => {
  const breakpointColumns = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };
  return (
    <Masonry className="flex mx-4 gap-4 " breakpointCols={breakpointColumns}>
      {results.map((result, idx) => (
        <Link href={result.link} key={idx} className="w-auto gap-4">
          <img
            src={result.image.thumbnailLink}
            alt="post_image"
            className="rounded-lg w-full"
          />
          <p className="line-clamp-1 mt-1 mb-4">{result.title}</p>
        </Link>
      ))}
    </Masonry>
  );
};

export default LensResults;
