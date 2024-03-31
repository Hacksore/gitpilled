import { ImageResponse } from "next/og";
import colors from "@/utils/colors.json";
import { getUsersTopLanguages } from "@/utils/github";
import { LanguageName } from "@/utils/types";
import { DEFAULT_COLOR } from "@/constants";
import { GitPilledLogo } from "@/components/logo";
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
  const bast64UserImage = await fetch(`https://github.com/${user}.png`)
    .then((r) => r.arrayBuffer())
    .then((r) => Buffer.from(r).toString("base64"));

  const res = await getUsersTopLanguages(user);
  if (!res) {
    return null;
  }
  const { languages, username } = res;

  const maxCount = languages[0].count;
  const languagesWithPercentage = languages.map((lang) => ({
    ...lang,
    percentage: 25 + Math.floor((lang.count / maxCount) * 100) * 0.75,
  }));
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
            color: "white"
          }}
        >
          <GitPilledLogo
            style={{
              height: 36,
              width: 208.08
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
                objectFit: "cover",
              }}
              src={`data:image/png;base64,${bast64UserImage}`}
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
              {languagesWithPercentage.map((lang, i) => {
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
    }
  );
}
