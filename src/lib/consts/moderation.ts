import { ContentFilter } from "../../../types/feed";

export const CONTENT_FILTER_OPTIONS: ContentFilter[] = [
  {
    type: "nsfw",
    label: "Explicit Sexual Images",
    visibility: "warn",
    values: ["porn", "nsfl"],
    adult: true,
    message: "Post contains explicit sexual images",
  },
  {
    type: "nudity",
    label: "Other Nudity",
    visibility: "warn",
    values: ["nudity"],
    adult: true,
    message: "Post contains nudity",
  },
  {
    type: "suggestive",
    label: "Sexually Suggestive",
    visibility: "show",
    values: ["sexual"],
    adult: true,
    message: "Post contains sexually suggestive content",
  },
  {
    type: "gore",
    label: "Violent / Bloody",
    visibility: "hide",
    values: ["gore", "self-harm", "torture", "nsfl", "corpse"],
    adult: true,
    message: "Post contains violent/bloody content",
  },
  {
    type: "hate",
    label: "Political Hate-Groups",
    visibility: "warn",
    values: ["icon-kkk", "icon-nazi", "icon-intolerant", "behavior-intolerant"],
    adult: false,
    message: "Post has political hate content",
  },
  {
    type: "spam",
    label: "Spam",
    visibility: "hide",
    values: ["spam"],
    adult: false,
    message: "Post has been flagged as spam",
  },
  {
    type: "impersonation",
    label: "Impersonation",
    visibility: "warn",
    values: ["impersonation"],
    adult: false,
    message: "This account has been flagged as an impersonation",
  },
];
