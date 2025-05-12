import { FilterProvider } from "@/shared/context/FilterContext/FilterContext";
import Filter from "@/widgets/Home/Filter/Filter";
import Items from "@/widgets/Home/Items/Items";

const Home = () => {

  return (
    <FilterProvider>
      <div className="flex flex-col max-w-5xl h-full justify-between mx-auto px-4 py-6 space-y-6 flex-grow:0">
        <Filter />
        <Items />
      </div>
    </FilterProvider>
  );
};

export default Home;
