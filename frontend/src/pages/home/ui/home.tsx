import { FC } from "react";
import DefaultLayout from "@/widgets/default-layout";
import { useGroups } from "@/entities/groups/model/hooks";
import { Select } from "@/shared/ui";
import { Loader } from "@/shared/ui/loader";

const Home: FC = () => {
  const {
    list,
    hasNextPage,
    isError,
    isSuccess,
    isLoading,
    fetchNextPage
  } = useGroups({
    quantity: 4
  });

  return (
    <DefaultLayout>
      <div className="g-home container pt-4">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            <div>
              <div>Список групп</div>

              <div className="mt-2">
                {isSuccess && (
                  <Select
                    isInfinity={true}
                    isTotal={!hasNextPage}
                    list={list}
                    onNext={fetchNextPage}
                  />
                )}
              </div>
            </div>

            {isError && <div>Ошибка загрузки данных</div>}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Home;
