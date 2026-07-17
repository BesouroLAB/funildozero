import React from "react";

interface VideoEmbedProps {
  videoId: string;
  title?: string;
  caption?: string;
}

export function VideoEmbed({ 
  videoId, 
  title = "YouTube video player",
  caption 
}: VideoEmbedProps) {
  return (
    <div className="my-8 flex flex-col gap-2">
      <div 
        className="relative w-full overflow-hidden rounded-xl border border-[#00B2B2]/20 bg-gray-100 shadow-sm" 
        style={{ paddingTop: "56.25%" }}
      >
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-[#0B132B]/70 italic">{caption}</p>
      )}
    </div>
  );
}
