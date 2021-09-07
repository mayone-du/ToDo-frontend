type Props = {
  errorMessage?: string;
};

export const Error: React.VFC<Props> = (props) => {
  return (
    <div>
      <h2 className="font-bold text-center">Error</h2>
      <p>{props.errorMessage ?? "エラーが発生しました。"}</p>
    </div>
  );
};
