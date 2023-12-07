import React from 'react';

type URLsPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function URLsPage(props: URLsPageProps) {
  const { searchParams } = props;

  return (
    <div>
      All urls. Search params
      {Object.keys(searchParams).map((key) => {
        return (
          <div key={key}>
            {key}: {searchParams[key]}
          </div>
        );
      })}
    </div>
  );
}

export default URLsPage;
