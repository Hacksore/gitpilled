/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import colors from "@/utils/colors.json";
import { getUsersTopLanguages } from "@/utils/github";
import { LanguageName } from "@/utils/types";
import { DEFAULT_COLOR } from "@/constants";
import { GitPilledLogo } from "@/components/logo";
import { notFound } from "next/navigation";
// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "GitPilled OG Image";
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
  const { user } = props.params;

  let res;
  try {
    res = await getUsersTopLanguages(user);
  } catch (e) {
    // do nothing and eat the error 
  }

  if (!res) {
    const rawImageData = await fetch(
      new URL("../opengraph-image.png", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const imageData = `data:image/png;base64,${Buffer.from(
      rawImageData,
    ).toString("base64")}`;
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            background: "#f6f6f6",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={imageData} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  }

  const { pilledLanguages, username } = res;
  const base64UserImage = await fetch(`https://github.com/${user}.png`)
    .then(async (r) => r.blob())
    .then(
      async (blob) =>
        `data:${blob.type};base64,${Buffer.from(
          await blob.arrayBuffer(),
        ).toString("base64")}`,
    );

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          /* grid using gradient */
          backgroundImage: `linear-gradient(to bottom, #131313, #0a0a0a)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 36,
            right: 48,
            color: "white",
          }}
        >
          <GitPilledLogo
            style={{
              height: 36,
              width: 208.08,
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            /* grid using gradient */
            backgroundSize: "100px 100px",
            backgroundImage: `linear-gradient(to right, #ffffff10 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff10 1px, transparent 1px)`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              color: "white",
              fontSize: 48,
            }}
          >
            <img
              alt="Logo"
              height={120}
              width={120}
              style={{
                marginTop: 24,
                borderRadius: "50%",
                background: "#888",
                objectPosition: "cover",
              }}
              src={base64UserImage}
            />
            @{username}
          </div>
          <div
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              flexGrow: 1,
              gap: 12,
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: 64,
                height: "100%",
              }}
            >
              {pilledLanguages.map((lang, i) => {
                const bgColor =
                  colors[lang.name.toLocaleLowerCase() as LanguageName].color ||
                  DEFAULT_COLOR;
                return (
                  <div
                    key={lang.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                      justifyContent: "flex-end",
                      gap: 32,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        fontSize: 32,
                        color: "white",
                      }}
                    >
                      {lang.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",

                        height: `${lang.percentage * 0.85}%`,
                        width: 120,
                        backgroundColor: bgColor,

                        borderRadius: "32px 32px 0 0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 30,
                          marginTop: 8,
                          background: "#ffffff80",
                          color: "black",
                          borderRadius: 12,
                          padding: 12,
                          marginBottom: 12,
                        }}
                      >
                        #{i + 1}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  );
}
