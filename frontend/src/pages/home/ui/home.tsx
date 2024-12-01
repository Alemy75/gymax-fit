import { FC } from "react";
import DefaultLayout from "@/widgets/default-layout";
import { useGroups } from "@/entities/groups/model/hooks";

const Home: FC = () => {
  const { data, isError, isSuccess, isLoading } = useGroups();

  return (
    <DefaultLayout>
      <div className="g-home container">
        <div className="mt-4">Список групп</div>

        <div className="mt-4">
          {isLoading && <div>Загрузка...</div>}

          {isError && <div>Произошла ошибка</div>}

          {isSuccess && (
            <>
              {data.map((item) => (
                <button className="px-4 py-4 bg-surface rounded-2">
                  <div className="text-h3">{item.name}</div>
                  <div>Группа мышц</div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
