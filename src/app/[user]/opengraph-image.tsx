import { ImageResponse } from "next/og";
import colors from "@/utils/colors.json";
import { DEFAULT_COLOR, LanguageName } from "@/utils";
// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image(props: {
  params: {
    user: string;
  };
}) {
  // Font
  //   const interSemiBold = fetch(
  //     new URL("./Inter-SemiBold.ttf", import.meta.url)
  //   ).then((res) => res.arrayBuffer());
  const user = props.params.user;
  const languagesWithPercentage = [] as any[];

  const bast64UserImage = await fetch(`https://github.com/${user}.png`)
    .then((r) => r.arrayBuffer())
    .then((r) => Buffer.from(r).toString("base64"));

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          backgroundColor: "#131313",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt="Logo"
          height={120}
          width={120}
          style={{
            marginTop: 24,
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={`data:image/png;base64,${bast64UserImage}`}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexGrow: 1,
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
          }}
        ></div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      //   fonts: [
      //     {
      //       name: "Inter",
      //     //   data: await interSemiBold,
      //       style: "normal",
      //       weight: 400,
      //     },
      //   ],
    }
  );
}
