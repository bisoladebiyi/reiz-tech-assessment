import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import CountriesList from "../../components/CountriesList";
import Stats from "../../components/Stats";
import { ICountries, IStats } from "../../utils/Interfaces/interfaces";
import { getCountries } from "../../utils/Requests/requests";
import Error from "../ErrorPage";

const Dashboard = () => {
  const [stats, setStats] = useState<IStats>({ countries: 0, totalArea: 0 });
  const [countriesInfo, setCountriesInfo] = useState<
    ICountries[] | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [somethingWentWrong, setSomethingWentWrong] = useState<boolean>(false);

  useEffect(() => {
    getRequiredInfo();
  }, []);

  const getRequiredInfo = async () => {
    try {
      const data = await getCountries();

      let totalArea: number = data
        ?.map(({ area }: Omit<ICountries, "name" | "region">) => area)
        .filter((area: any) => area !== undefined)
        .reduce((a: number, b: number) => a + b);

      setStats({ countries: data.length, totalArea });

      setCountriesInfo(
        data.map(({ area, name, region }: ICountries) => ({
          area,
          name,
          region,
        }))
      );
    } catch (e) {
      setSomethingWentWrong(true);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isLoading && !somethingWentWrong ? (
        <main>
          <Stats stats={stats} />
          <CountriesList countriesInfo={countriesInfo} />
        </main>
      ) : (
        isLoading && (
          <div className="Loader-Wrapper">
            <BarLoader
              color={"#16c098"}
              loading={isLoading}
              height={4}
              width={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )
      )}

      {/* show error  */}
      {somethingWentWrong && (
        <Error errorMsg="This is embarrasing 😬" desc="It's not you, it's us" />
      )}
    </div>
  );
};

export default Dashboard;
