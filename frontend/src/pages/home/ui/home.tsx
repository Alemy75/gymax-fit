import { FC, useMemo } from "react";
import DefaultLayout from "@/widgets/default-layout";
import {
  useGroups,
  getGroupsArray
} from "@/entities/groups/model/hooks";
import { Select } from "@/shared/ui";

const Home: FC = () => {
  const {
    data,
    hasNextPage,
    isError,
    isSuccess,
    isLoading,
    fetchNextPage
  } = useGroups({
    quantity: 2
  });

  const formattedList = useMemo(() => {
    return data
      ? getGroupsArray(data.pages).map((item) => ({
          id: item.id,
          name: item.name ?? ""
        }))
      : [];
  }, [data]);

  return (
    <DefaultLayout>
      <div className="g-home container">
        <div className="mt-4">Список групп</div>

        <div className="mt-2">
          {isLoading && <div>Загрузка...</div>}

          {isError && <div>Произошла ошибка</div>}

          {isSuccess && <Select list={formattedList} />}
        </div>
      </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>NExt</button>
      )}
    </DefaultLayout>
  );
};

export default Home;
