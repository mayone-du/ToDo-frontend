import type { ApolloError } from "@apollo/client";

type Props = {
  error?: ApolloError;
  displayMessage?: string;
};

export const Error: React.VFC<Props> = (props) => {
  if (props.error) {
    console.error(props.error);
  }
  return (
    <div className="py-4 bg-green-500">
      <h2 className="font-bold text-center">Error</h2>
      <p>{props.error?.message ?? "エラーが発生しました。"}</p>
    </div>
  );
};
