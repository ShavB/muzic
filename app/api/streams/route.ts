import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
//@ts-ignore
import youtubeAPI from "youtube-search-api";

const YOUTUBE_REGEX = new RegExp(
  /https:\/\/(?:www\.)?youtube\.com\/watch\?v=[\w-]+/gm
);

const CreatStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreatStreamSchema.parse(await req.json());

    const isYoutube = await YOUTUBE_REGEX.test(data.url);
    if (!isYoutube) {
      return NextResponse.json(
        {
          message: "Wrong URL format",
        },
        {
          status: 411,
        }
      );
    }

    const extractedId = data.url.split("?v=")[1];
    const songData = await youtubeAPI.GetVideoDetails(extractedId);
    console.log(songData.thumbnail.thumbnails);
    const imageBySize = songData.thumbnail.thumbnails.sort(
      (a: { width: Number }, b: { width: Number }) =>
        a.width > b.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: songData.title,
        smallImageUrl: imageBySize[1].url,
        bigImageUrl: imageBySize[0].url,
      },
    });
    return NextResponse.json({
      message: `Stream added by the user`,
      id: stream.id,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Error while adding stream",
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });
  return NextResponse.json({
    streams,
  });
}
