export const customResponse = ({
  response,
  page,
  take
}: {
  response: [data: Record<string, any>, count: number];
  page: number;
  take: number;
}) => {
  return {
    data: response[0],
    count: response[1],
    hasNext: response[1] > page * take,
    hasPrev: page > 1
  };
};
