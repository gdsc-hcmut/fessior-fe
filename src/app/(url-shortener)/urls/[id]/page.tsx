import React from 'react';

type URLDetailPageProps = {
  params: { id: string };
};

function URLDetailPage(props: URLDetailPageProps) {
  const {
    params: { id },
  } = props;

  return <div>URLDetailPage: {id}</div>;
}

export default URLDetailPage;
