import { FC, useMemo } from "react";
import DefaultLayout from "@/widgets/default-layout";
import { useGroups } from "@/entities/groups/model/hooks";
import { Select } from "@/shared/ui";

const Home: FC = () => {
  const { data, isError, isSuccess, isLoading } = useGroups();

  const formattedList = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      name: item.name ?? ""
    }));
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
    </DefaultLayout>
  );
};

export default Home;
