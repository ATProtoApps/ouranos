"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { getPostThread } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import { AppBskyFeedDefs } from "@atproto/api";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import {
  PostView,
  ThreadViewPost,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import useOrganizeThread from "@/lib/hooks/bsky/feed/useOrganizeThread";
import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import useContentFilter from "@/lib/hooks/bsky/actor/useContentFilter";
import ThreadPost from "@/components/contentDisplay/threadPost/ThreadPost";

interface Props {
  id: string;
  handle: string;
}

export default function PostThreadContainer(props: Props) {
  const { id, handle } = props;
  const agent = useAgent();

  const thread = useQuery({
    queryKey: ["postThread", id],
    queryFn: async () => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostThread(agent, uri);
    },
  });

  const { replyChains, parentChain } = useOrganizeThread({
    thread: thread.data,
  });

  const { preferences } = usePreferences();
  const contentFilter = useContentFilter(preferences);

  return (
    <>
      <div className="sm:border sm:border-b-0 border-b-0 sm:border-x sm:rounded-t-2xl">
        <h2 className="text-xl text-center font-semibold px-3 py-2">Thread</h2>
      </div>

      {parentChain && parentChain.length > 0 && (
        <div className="flex flex-col justify-between p-3 border border-x-0 sm:border-x  first:border-t-0 last:border-b last:rounded-b-2xl even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
          {parentChain.map((parent, i) => (
            <FeedPost
              key={parent.post.uri + i}
              post={parent}
              filter={contentFilter}
              isParent={i < parentChain.length - 1}
            />
          ))}
        </div>
      )}

      {thread?.data && (
        <ThreadPost
          post={thread?.data?.post as PostView}
          filter={contentFilter}
        />
      )}
      {replyChains &&
        replyChains.map((replyArr, i) => (
          <div
            className="flex flex-col justify-between p-3 border border-x-0 sm:border-x first:border-t-0 last:border-b last:rounded-b-2xl even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0"
            key={i}
          >
            {replyArr.map((reply, j) => (
              <FeedPost
                key={j + reply.post.uri}
                post={reply}
                filter={contentFilter}
                isParent={j < replyArr.length - 1}
              />
            ))}
          </div>
        ))}
    </>
  );
}