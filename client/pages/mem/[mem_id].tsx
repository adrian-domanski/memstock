import { useQuery } from "@apollo/react-hooks";
import { SingletonRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout/Layout";
import Loader from "../../components/Loader";
import MemComments from "../../components/Mem/MemComments/MemComments";
import MemItem from "../../components/Mem/MemItem/MemItem";
import { getMemDetailsQuery } from "../../queries/memQueries";
import {
  ContentBody,
  ContentFooter,
  ContentHeader,
} from "../../utils/styled/components/components";

interface Props {
  router: SingletonRouter;
}

const MemDetails: React.FC<Props> = ({ router }) => {
  const COMMENTS_CONFIG = {
    COMMENTS_ON_START: 10,
    FETCH_MORE_COMMENTS_AMOUNT: 10,
  };

  const [commentsOffset, setCommentsOffset] = useState(
    COMMENTS_CONFIG.COMMENTS_ON_START
  );
  const [fetchMoreCommentsLoading, setFetchMoreCommentsLoading] = useState(
    false
  );
  const memId = router.query.mem_id.toString();
  const [areThereMoreComments, setAreThereMoreComments] = useState(true);
  const { data, loading, updateQuery, fetchMore } = useQuery(
    getMemDetailsQuery,
    {
      variables: {
        id: memId,
        commentsLimit: COMMENTS_CONFIG.COMMENTS_ON_START,
        commentsStart: 0,
      },
      ssr: false,
    }
  );

  useEffect(() => {
    if (data && data.mem === null) {
      router.push("/404");
    }
  }, [data]);

  const fetchMoreComments = async () => {
    if (fetchMoreCommentsLoading) return;
    setFetchMoreCommentsLoading(true);
    await fetchMore({
      variables: {
        id: memId,
        commentsLimit: COMMENTS_CONFIG.FETCH_MORE_COMMENTS_AMOUNT,
        commentsStart: commentsOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.mem.comments.length) {
          setAreThereMoreComments(false);
          return prev;
        }

        setCommentsOffset(
          commentsOffset + COMMENTS_CONFIG.FETCH_MORE_COMMENTS_AMOUNT
        );
        return {
          ...prev,
          mem: {
            ...prev.mem,
            comments: [...prev.mem.comments, ...fetchMoreResult.mem.comments],
          },
        };
      },
    }).then(() => {
      setFetchMoreCommentsLoading(false);
    });
  };

  return (
    <Layout
      ogImage={`${process.env.SERVER_URL}${data?.mem?.image?.url}`}
      ogTitle={`${data?.mem?.title} - MemStock`}
      ogType="article"
      ogUrl={`${process.env.CLIENT_URL}/mem/${data?.mem?.id}`}
      topUsers
      popularMems
    >
      {!loading && data?.mem ? (
        <MemItem mem={data.mem} updateMemQuery={updateQuery} />
      ) : (
        <>
          <ContentHeader />
          <ContentBody>
            <Loader />
          </ContentBody>
          <ContentFooter />
        </>
      )}
      {!loading && data?.mem ? (
        <MemComments
          memId={memId}
          comments={data.mem.comments}
          hasMore={areThereMoreComments}
          fetchMoreComments={fetchMoreComments}
          updateMemQuery={updateQuery}
        />
      ) : (
        <>
          <ContentHeader />
          <ContentBody>
            <Loader />
          </ContentBody>
          <ContentFooter />
        </>
      )}
    </Layout>
  );
};

export default withRouter(MemDetails);
