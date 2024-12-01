import { supabase } from "@/shared/api/supabase";
import { useEffect, useState } from "react";
import { Group } from "./types";

export const useGroups = (): IGroupsReturn => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getMuscles = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const { data } = await supabase
        .from("muscle_group")
        .select("*");

      if (!data) return;

      setGroups(() => data);

      setIsSuccess(true);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMuscles();
  }, []);

  return {
    isError,
    isLoading,
    isSuccess,
    data: groups
  };
};

interface IGroupsReturn {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: Group[];
}
