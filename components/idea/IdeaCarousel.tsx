"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Icon from "@/components/common/Icon";
import ImageShimmer from "@/components/common/ImageShimmer";
import { AppStrings } from "@/constants/app_strings";
import type { IdeaScreen } from "@/models/idea-screen.model";
import { cn } from "@/utils/classnames";

type CarouselTone = "light" | "dark";

const TONES: Record<
  CarouselTone,
  { eyebrow: string; title: string; body: string; frame: string; button: string; dot: string; note: string }
> = {
  light: {
    eyebrow: "text-brand-strong",
    title: "text-text-dark",
    body: "text-text-soft",
    frame: "bg-white ring-black/10 shadow-black/10",
    button: "border-black/15 bg-white text-text-dark hover:border-brand-strong hover:text-brand-strong",
    dot: "bg-black/20",
    note: "border-brand-strong bg-white text-text-dark",
  },
  dark: {
    eyebrow: "text-brand",
    title: "text-white",
    body: "text-white/80",
    frame: "bg-white/5 ring-white/10 shadow-black/40",
    button: "border-white/20 bg-white/5 text-white hover:border-brand hover:text-brand",
    dot: "bg-white/30",
    note: "border-brand bg-white/5 text-white",
  },
};

const SWIPE_THRESHOLD_PX = 40;
const FRAME_RADIUS = "rounded-[1.75rem]";

/** Adds a key to a Set state immutably (returns the same Set if already present). */
const withKey = (key: string) => (previous: ReadonlySet<string>) =>
  previous.has(key) ? previous : new Set(previous).add(key);
const pad = (value: number) => String(value).padStart(2, "0");

interface IdeaCarouselProps {
  /** Accessible name for the carousel region (the journey title). */
  label: string;
  screens: readonly IdeaScreen[];
  tone?: CarouselTone;
  /** Image on the left on desktop, for visual rhythm between sections. */
  reverse?: boolean;
  /** Load the first screenshot immediately (only for the first carousel on the page). */
  eagerFirstImage?: boolean;
}

/** One screen at a time: screenshot + details, with buttons, dots, arrow keys and swipe. */
export default function IdeaCarousel({ label, screens, tone = "light", reverse = false, eagerFirstImage = false }: IdeaCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  // Per-screenshot load state (keyed by screenKey) so revisited or prefetched screens skip the skeleton.
  const [loadedImages, setLoadedImages] = useState<ReadonlySet<string>>(() => new Set());
  const [failedImages, setFailedImages] = useState<ReadonlySet<string>>(() => new Set());
  // Screens already retried once after an error (e.g. a transient optimizer timeout).
  const [retriedImages, setRetriedImages] = useState<ReadonlySet<string>>(() => new Set());

  const handleImageError = (key: string) => {
    if (retriedImages.has(key)) setFailedImages(withKey(key));
    else setRetriedImages(withKey(key)); // new React key below remounts the image → one fresh request
  };
  const copy = AppStrings.idea.carousel;
  const styles = TONES[tone];
  const total = screens.length;
  const screen = screens[index];

  if (!screen) return null;

  const isLoaded = loadedImages.has(screen.screenKey);
  const hasFailed = failedImages.has(screen.screenKey);

  const goTo = (next: number) => setIndex(Math.min(Math.max(next, 0), total - 1));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") goTo(index - 1);
    else if (event.key === "ArrowRight") goTo(index + 1);
    else return;
    event.preventDefault();
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start === null) return;
    const delta = event.changedTouches[0].clientX - start;
    if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) goTo(delta < 0 ? index + 1 : index - 1);
  };

  const controlButton = cn(
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40",
    styles.button,
  );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="grid items-center gap-8 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand lg:grid-cols-2 lg:gap-16"
    >
      <p className="sr-only">{copy.keyboardHint}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {copy.position(index + 1, total, screen.title)}
      </p>

      {/* Fixed-ratio frame keeps the layout stable; screenshots are never cropped. */}
      <div
        className={cn("flex justify-center", reverse ? "lg:order-1" : "lg:order-2")}
        onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            "relative aspect-[878/1792] w-[clamp(12.5rem,60vw,18rem)] overflow-hidden shadow-2xl ring-1 lg:w-[clamp(16rem,21vw,20rem)]",
            FRAME_RADIUS,
            styles.frame,
          )}
        >
          <ImageShimmer tone={tone} hidden={isLoaded || hasFailed} className={FRAME_RADIUS} />
          {hasFailed && (
            <div className={cn("absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center", styles.body)}>
              <Icon name="alertCircle" className="size-6" />
              <p className="text-sm font-medium">{copy.previewUnavailable}</p>
            </div>
          )}
          {/* The next screenshot is rendered invisibly so it is usually ready before "Next" is pressed. */}
          {screens.slice(index, index + 2).map((item, offset) => {
            const isVisible = offset === 0 && loadedImages.has(item.screenKey);
            return (
              <Image
                key={retriedImages.has(item.screenKey) ? `${item.screenKey}:retry` : item.screenKey}
                src={item.imageUrl}
                alt={offset === 0 ? item.imageAlt : ""}
                aria-hidden={offset === 0 ? undefined : true}
                fill
                sizes="(min-width: 1024px) 320px, 60vw"
                loading={eagerFirstImage && index === 0 && offset === 0 ? "eager" : "lazy"}
                onLoad={() => setLoadedImages(withKey(item.screenKey))}
                onError={() => handleImageError(item.screenKey)}
                className={cn(
                  FRAME_RADIUS,
                  "object-contain transition-opacity duration-200 motion-reduce:transition-none",
                  isVisible ? "opacity-100" : "pointer-events-none opacity-0",
                  failedImages.has(item.screenKey) && "invisible",
                )}
              />
            );
          })}
        </div>
      </div>

      <div className={cn("flex min-w-0 flex-col gap-5 lg:min-h-[28rem] lg:justify-center", reverse ? "lg:order-2" : "lg:order-1")}>
        <p className={cn("text-eyebrow", styles.eyebrow)}>
          {copy.screen} {pad(screen.screenNumber)}
        </p>
        <h3 className={cn("text-2xl font-bold text-balance sm:text-3xl", styles.title)}>{screen.title}</h3>
        <p className={cn("leading-relaxed break-words", styles.body)}>{screen.description}</p>

        {screen.actions.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className={cn("text-sm font-semibold", styles.title)}>{copy.actionsHeading}</h4>
            <ul className="flex flex-col gap-2">
              {screen.actions.map((action) => (
                <li key={action} className={cn("flex items-start gap-2.5 text-sm leading-relaxed", styles.body)}>
                  <Icon name="check" className="mt-0.5 size-4 text-brand" />
                  <span className="min-w-0 break-words">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {screen.note && (
          <p className={cn("rounded-xl border-l-4 px-4 py-3 text-sm leading-relaxed break-words", styles.note)}>
            <span className="font-semibold">{copy.noteLabel}: </span>
            {screen.note}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label={copy.previous}
              className={controlButton}
            >
              <Icon name="arrowRight" className="size-5 rotate-180" />
            </button>
            <span aria-hidden="true" className={cn("min-w-[4.5rem] text-center font-semibold tabular-nums", styles.title)}>
              {pad(index + 1)} / {pad(total)}
            </span>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === total - 1}
              aria-label={copy.next}
              className={controlButton}
            >
              <Icon name="arrowRight" className="size-5" />
            </button>
          </div>

          <div role="group" aria-label={copy.pagination} className="flex flex-wrap gap-1">
            {screens.map((item, itemIndex) => (
              <button
                key={item.screenKey}
                type="button"
                onClick={() => goTo(itemIndex)}
                aria-label={copy.goTo(item.screenNumber, item.title)}
                aria-current={itemIndex === index ? "step" : undefined}
                className="group inline-flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all motion-reduce:transition-none",
                    itemIndex === index ? "w-5 bg-brand" : cn("w-2 group-hover:bg-brand/60", styles.dot),
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
